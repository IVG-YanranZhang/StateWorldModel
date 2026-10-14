"""Encode the selected original transparent cover artwork for browser delivery."""
import argparse
from pathlib import Path
from PIL import Image, features

ROOT = Path(__file__).resolve().parents[1]

def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('source', type=Path, help='Selected original transparent PNG artwork')
    args = parser.parse_args()
    if not features.check('avif'):
        raise RuntimeError('This Pillow installation needs AVIF encoding support.')
    original = Image.open(args.source)
    if 'A' not in original.getbands():
        raise ValueError('The selected cover artwork must preserve transparency.')
    output = ROOT / 'static/images/concepts'
    output.mkdir(parents=True, exist_ok=True)
    for width in [768, 1536]:
        size = (width, round(original.height * width / original.width))
        image = original.resize(size, Image.Resampling.LANCZOS)
        for extension, options in [('webp', {'quality': 88, 'method': 6}), ('avif', {'quality': 70, 'speed': 6})]:
            path = output / f'state-world-layers-{width}.{extension}'
            image.save(path, **options)
            print(f'{path.relative_to(ROOT)}: {path.stat().st_size:,} bytes')

if __name__ == '__main__':
    main()
