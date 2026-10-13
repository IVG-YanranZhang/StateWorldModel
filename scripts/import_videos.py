"""Replace an existing showcase recording from an explicit local manifest.

Each entry declares id, twin, model (registry key or exact display name), probe,
and local path. Optional judge metadata must belong to this exact recording.
Omitting judge removes its badge rather than copying a prior clip's decision.
Keep manifests outside the public repository because paths may be private.
"""
from site_data import sync_example_posters
import argparse
import hashlib
import json
from pathlib import Path
import subprocess
ROOT=Path(__file__).resolve().parents[1]

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('manifest',type=Path)
    args=parser.parse_args()
    entries=json.loads(args.manifest.read_text())
    if not isinstance(entries,list):raise ValueError('Manifest must be an array.')
    data_path=ROOT/'static/data/benchmark.js'
    models_text,samples_text=data_path.read_text().split('\nwindow.SWM_SAMPLES = ',1)
    models=json.loads(models_text.removeprefix('window.SWM_MODELS = ').rstrip(';\n'))
    samples=json.loads(samples_text.rstrip(';\n'))
    by_id={sample['id']:sample for sample in samples}
    model_lookup={model['key']:model['key'] for model in models}
    model_lookup.update({model['name']:model['key'] for model in models})
    for entry in entries:
        if entry['id'] not in by_id or entry['twin'] not in ['A','B']:raise ValueError('Unknown showcase pair or twin.')
        if entry['model'] not in model_lookup:raise ValueError('Unknown model; update the curated registry before adding a backend.')
        entry['modelKey']=model_lookup[entry['model']]
        allowed={'harness'} if entry['modelKey']=='ours' else {'rule','ending'}
        if entry['probe'] not in allowed:raise ValueError('Probe must match the actual run: harness, rule or ending.')
        if not Path(entry['path']).is_file():raise ValueError('Source recording does not exist.')
        judge=entry.get('judge')
        if judge is not None:
            for key in ['outcomeOk','counterOk','strictOk']:
                if not isinstance(judge.get(key),bool):raise ValueError('Judge flags must be booleans.')
            if judge['strictOk']!=(judge['outcomeOk'] and judge['counterOk']):raise ValueError('Inconsistent strict decision.')
            if not isinstance(judge.get('evidence',''),str):raise ValueError('Judge evidence must be text.')
    for entry in entries:
        source=Path(entry['path']);digest=hashlib.sha256(source.read_bytes()).hexdigest()[:10]
        name=f"{entry['modelKey']}-{entry['probe']}-{entry['id']}-{entry['twin']}-{digest}"
        video=ROOT/f'static/videos/benchmark/{name}.mp4';poster=ROOT/f'static/images/benchmark/{name}.webp'
        if not video.exists():
            subprocess.run(['ffmpeg','-y','-v','error','-i',str(source),'-vf','scale=768:-2','-c:v','libx264','-threads','2','-crf','26','-preset','medium','-pix_fmt','yuv420p','-an','-movflags','+faststart',str(video)],check=True)
        if not poster.exists():
            subprocess.run(['ffmpeg','-y','-v','error','-sseof','-0.2','-i',str(video),'-frames:v','1',str(poster)],check=True)
        info=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','json',str(video)]))
        judge=entry.get('judge')
        public_judge=None if judge is None else {key:judge.get(key) for key in ['outcomeOk','counterOk','strictOk','observedEnding','evidence']}
        record=dict(src=video.relative_to(ROOT).as_posix(),poster=poster.relative_to(ROOT).as_posix(),duration=round(float(info['format']['duration']),2),judge=public_judge)
        by_id[entry['id']]['recordings'][entry['modelKey']][entry['probe']][entry['twin']]=record
    data_path.write_text('window.SWM_MODELS = '+json.dumps(models,ensure_ascii=False,separators=(',',':'))+';\nwindow.SWM_SAMPLES = '+json.dumps(samples,ensure_ascii=False,separators=(',',':'))+';\n')
    sync_example_posters(ROOT, samples)
    print(f'Imported {len(entries)} recordings; prior judgments are never assigned to new clips.')

if __name__=='__main__':main()
