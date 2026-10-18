"""Export only the current project page and its public runtime assets."""
import argparse
from html.parser import HTMLParser
import json
from pathlib import Path
import shutil
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]

class Assets(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = set()

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key == 'srcset' and value:
                for candidate in value.split(','):
                    self.paths.add(candidate.strip().split()[0])
            if key in {'src', 'href', 'poster', 'data-poster-a', 'data-poster-b'} and value:
                url = urlsplit(value)
                if not url.scheme and not url.netloc and url.path:
                    self.paths.add(url.path)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', type=Path, required=True)
    args = parser.parse_args()
    output = args.output.resolve()
    if output == ROOT or (output.exists() and any(output.iterdir())):
        raise ValueError('Export requires a new or empty output directory.')
    page = Assets()
    page.feed((ROOT / 'index.html').read_text())
    paths = page.paths | {'index.html', 'static/data/benchmark.js', 'static/data/worlds.js', 'static/data/showcase-descriptions.json', 'static/fonts/Manrope.woff2', 'static/fonts/OFL-Manrope.txt', 'static/images/social-card.jpg'}
    samples = json.loads((ROOT / 'static/data/benchmark.js').read_text().split('\nwindow.SWM_SAMPLES = ', 1)[1].rstrip(';\n'))
    for sample in samples:
        paths.update([sample['image'],sample['thumbnail']])
        for tracks in sample['recordings'].values():
            for twins in tracks.values():
                for record in twins.values():
                    paths.update([record['src'], record['poster']])
    worlds=json.loads((ROOT/'static/data/worlds.js').read_text().split(' = ',1)[1].rstrip(';\n'))
    for world in worlds:
        paths.update(world[key] for key in ['src','preview','poster','thumbnail'])
    paths.update(['static/videos/state-world-models-v7.mp4', 'static/images/project-film-v7.jpg'])
    for path in paths:
        source = (ROOT / path).resolve()
        if not source.is_relative_to(ROOT) or not source.is_file():
            raise ValueError(f'Invalid public asset: {path}')
    output.mkdir(parents=True, exist_ok=True)
    for path in sorted(paths):
        target = output / path
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(ROOT / path, target)
    (output / '.nojekyll').touch()
    size = sum((output / path).stat().st_size for path in paths)
    print(f'Exported {len(paths)} public files, {size / 1024 / 1024:.1f} MiB. Historical templates and internal documents are excluded.')

if __name__ == '__main__':
    main()
