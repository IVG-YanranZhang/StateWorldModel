# Published episode stills

These twelve images are extracted directly from Figure 6 on PDF page 9 of the supplied 36-page anonymous submission. Each is the second image in one of the figure's four paired steps for town exploration, dating, or the duel. The original 864 × 480 pixels are retained; the only transformation is WebP encoding at quality 86.

The webpage transcribes the figure's step labels, elapsed episode times and state values as readable HTML. It shows one published still per step. These episodes are separate from the three interactive world previews elsewhere on the page. The complete original figure remains available as `../swm_multiturn.png`.

`provenance.json` records the figure/page, original PDF placement and SHA-256 of each extracted source image. Selection follows the figure's row and column geometry, independently of PDF object numbering.

Regenerate from the repository root:

```bash
python3 scripts/prepare_episode_frames.py --paper /path/to/submission.pdf
```

The main `prepare_assets.py` command also regenerates these frames. A revised PDF requires reviewing the figure placement and captions.
