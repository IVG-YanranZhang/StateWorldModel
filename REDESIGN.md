# State World Models project page

A buildless, anonymous paper project page, hosted by the existing GitHub Pages configuration. No new hosting service or third-party fonts are required.

## Source

- `index.html`: research narrative, three-world player, result chart, full Table 1, benchmark explorer, paper and citation.
- `static/css/project.css`: warm paper palette, restrained green accents, serif headings, responsive layouts and accessibility states.
- `static/js/project.js`: world switching, theme filtering, sample selection, model recording players, paired playback, citation copying.
- `static/data/benchmark.js`: 50 pairs, 21 themes, 49 hidden variables. No private filesystem paths in served data.
- `static/images/benchmark/`: audited shared first frames in WebP.
- `static/images/paper/benchmark-comparison.png`: Figure 4 from the supplied submission, including model names and verdicts.
- `static/pdfs/state-world-models.pdf`: the 36-page anonymous submission, distinct from the previous template PDFs.

The current recording inventory includes the three existing harness highlight reels and one locally available LongCat B01-A recording. The LongCat recording has no assigned paper-probe label or judge verdict because those records were not available. Other model videos must be imported from their original runs before this page can be described as a complete video comparison.

## Preview and checks

```bash
python3 -m http.server 8899
python3 scripts/validate_site.py
node --check static/js/project.js
```

Preview at `http://localhost:8899/`. Validation requires Python with Pillow and PyMuPDF, Node, and FFmpeg. Browser checks should cover desktop at 1440px, tablet at 820px, and phones at 390px and 320px: world selection, all theme options, A/B endings, video controls, table scrolling, citation copy and keyboard navigation.

## Prepare content

```bash
python3 scripts/prepare_assets.py --benchmark-root /path/to/benchmark --paper /path/to/submission.pdf
```

This rebuilds the initial local assets and data, including the one original LongCat clip. Run this before importing additional recordings because rebuilding replaces the recording inventory.

## Import additional model videos

Create a local JSON manifest with one object per actual recording:

```json
[
  {
    "id": "B01",
    "twin": "A",
    "model": "MiniMax-H3",
    "path": "/path/to/verified/B01-A.mp4",
    "track": "Rule-only"
  }
]
```

Only set a paper probe label after inspecting the actual run configuration and prompt. Omit `track` for an unverified recording. Keep local manifests outside the repository; they may contain private source paths.

```bash
python3 scripts/import_videos.py /path/to/local-manifest.json
python3 scripts/validate_site.py
```

The importer writes browser-compatible H.264 clips and WebP posters, updates the public sample data, and replaces an existing model/twin/track entry when rerun. All recordings for the selected pair appear in the explorer; multiple recordings expose a play-together button. This starts available clips together, without claiming frame-exact synchronization. No clip receives a verdict without its judge record.

## Submission facts corrected

Direct inspection of Table 1 in the supplied PDF corrects three errors in the previous page:

- MiniMax-H3 EndFollow: 66, previously 60.
- Echo-WM Flash TwinContrast: 42, previously 43.
- Astra: previously spelled Asra.

The separate 32 → 64 → 92 PairFollow chain is explicitly distinguished from Table 1's six columns. The highlighted harness row uses text and first-frame reference; the generic method supports spatial-preview reference inputs.

## Verification limits

Static and asset validation pass. Browser visual QA and remote recording collection require an environment that permits Chromium and SSH/network connections. This revision was prepared in an environment where these operations were blocked; no deployment is claimed on the basis of local validation.
