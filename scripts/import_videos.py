"""Import verified benchmark recordings from an explicit local manifest.

Manifest: [{"id":"B01", "twin":"A", "model":"MiniMax-H3",
            "path":"/absolute/local/video.mp4", "track":"Rule-only"}]
Only use a paper track label after checking the run's actual prompt metadata.
Source paths are never written to public page data.
"""
import argparse
import hashlib
import json
from pathlib import Path
import re
import subprocess

ROOT = Path(__file__).resolve().parents[1]

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('manifest', type=Path)
    args = parser.parse_args()
    entries = json.loads(args.manifest.read_text())
    if not isinstance(entries, list):
        raise ValueError('Manifest must contain an array.')
    data_path = ROOT/'static/data/benchmark.js'
    samples = json.loads(data_path.read_text().removeprefix('window.SWM_SAMPLES = ').rstrip(';\n'))
    by_id = {sample['id']: sample for sample in samples}
    # Validate the full manifest before creating assets.
    for entry in entries:
        if entry['id'] not in by_id or entry['twin'] not in ['A','B']:
            raise ValueError('Unknown case or twin.')
        if not isinstance(entry['model'], str) or not entry['model'].strip():
            raise ValueError('A model name is required.')
        if not Path(entry['path']).is_file():
            raise ValueError('Source video does not exist.')
        if any('\x00' in str(entry.get(key,'')) for key in ['model','track']):
            raise ValueError('Invalid metadata.')
    for entry in entries:
        source = Path(entry['path'])
        digest = hashlib.sha256(source.read_bytes()).hexdigest()[:12]
        slug = re.sub(r'[^a-z0-9]+','-',entry['model'].lower()).strip('-')[:50] or 'model'
        name = f"{slug}-{entry['id']}-{entry['twin']}-{digest}"
        dest = ROOT/f'static/videos/benchmark/{name}.mp4'
        poster = ROOT/f'static/images/benchmark/{name}.webp'
        if not dest.exists():
            subprocess.run(['ffmpeg','-y','-v','error','-i',str(source),'-vf','scale=854:-2','-c:v','libx264','-crf','24','-preset','fast','-an','-movflags','+faststart',str(dest)],check=True)
        subprocess.run(['ffmpeg','-y','-v','error','-i',str(dest),'-frames:v','1',str(poster)],check=True)
        videos = by_id[entry['id']].setdefault('videos',[])
        record = dict(model=entry['model'],twin=entry['twin'],track=entry.get('track','Local recording · protocol unverified'),src=dest.relative_to(ROOT).as_posix(),poster=poster.relative_to(ROOT).as_posix())
        key = lambda video: (video['model'],video['twin'],video['track'])
        videos[:] = [video for video in videos if key(video) != key(record)]
        videos.append(record)
    data_path.write_text('window.SWM_SAMPLES = '+json.dumps(samples,ensure_ascii=False,indent=2)+';\n')
    print(f'Imported {len(entries)} recordings; public data contains no source paths.')

if __name__ == '__main__':
    main()
