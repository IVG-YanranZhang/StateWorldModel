"""Keep the static B01 illustrations aligned with the recording inventory."""
from pathlib import Path
import re


def sync_example_posters(root: Path, samples: list) -> None:
    sample = next(item for item in samples if item['id'] == 'B01')
    page = root / 'index.html'
    html = page.read_text()
    for side in ['A', 'B']:
        poster = sample['recordings']['ours']['harness'][side]['poster']
        pattern = r'static/images/benchmark/ours-harness-B01-' + side + r'-[a-z0-9]+\.webp'
        html = re.sub(pattern, lambda match: poster, html)
    page.write_text(html)
