# State World Models project page

A buildless paper project page for the existing GitHub Pages host. The redesign uses a cinematic introduction, precise research graphics, an interactive execution trace, the full submission results, and a curated counterfactual video workbench.

## Content and provenance

The full WorldState-Bench has 50 twin pairs, 21 themes and 49 hidden variables. The page presents ten illustrative pairs: B01, B02, B08, B19, B20, B26, B29, B41, B50 and B35. B35 deliberately includes a harness rendering failure. Showcase outcomes are not used to estimate aggregate scores.

The workbench includes 460 recordings: both twins for eleven baseline backends under Rule-only and Rule+end, plus both twins for the full Stateful Harness. The harness recordings come from the archived first-frame-reference condition whose full-run metrics are 92% PairFollow and 90% PairStrict. Each source recording was matched to its hidden value and expected judge answer before encoding. Web copies preserve the temporal content, use H.264 at 768px width, and omit audio. Posters are the exact final decoded frames: the exporter reverses only the final second and selects its first frame. All 460 posters were independently checked by decoding the full clip and selecting its final frame index.

VLM badges and evidence come from the corresponding archived per-clip judgments. Some archival aggregate metrics differ slightly from the submitted table; the website's main results are transcribed from the supplied PDF rather than recomputed from these illustrative recordings. Initial-state and action checks are not part of the primary ending-compliance metrics.

Six user-selected English HUD episodes appear in the introduction, balanced across three types: two exploration worlds (The Lost Scroll, The Fox’s Gift), two duels (Moon Dragon, Eclipse Devourer), and two narratives (Erii Sakura, Starlight Yui). The exploration replays use exactly `openworld/chinese_seed7.mp4` and `openworld/japan_seed7.mp4`, replacing Oracle Machine and Shogun Palace. The page opens on exploration. Each has a muted 20-second preview and a complete replay with source audio, shown uncropped with headings and controls outside the image. These demonstrations are separate from Figure 6’s paper episodes.

The 2:59 project film is now v6. Its opening order is Chinese open-world exploration → Moon Dragon battle → Yui narrative, using a 12.95-second excerpt beginning at27s of the provided Chinese replay. Quiet BGM, native source audio and editorial SFX are retimed to this order. The title and all scenes after the reel retain the v4 timeline and imagery. Earlier removal of the Erii/Oracle opening clips and clay comparison remains in place. All v2/v3/v4/v5 final deliverables are preserved locally. V6 retains the original v5 mastered soundtrack outside the new opening reel.

The supplied PDF is a 36-page anonymous submission. Figure 4 supplies the published multi-model comparison, and Figure 6 supplies the paper's 15-act exploration, 29-turn dating and 11-turn duel episodes. The previous `swm_multiturn.png` was an incorrect table crop and has been replaced.

Figure 6 is presented as three native episode disclosures with readable step, time and state captions. Each uses four original 864 × 480 frames extracted from the PDF, selecting the second published still in each paired step. The complete figure remains linked. Native disclosures work without JavaScript, and their shared name permits one episode to stay open at a time in supporting browsers. Extraction and source hashes are documented in `static/images/paper/episodes/`.

At the user's request, More Works indexes the verified project pages for [MoGe4D](https://ivg-yanranzhang.github.io/MoGe4D/), [UniGenDet](https://ivg-yanranzhang.github.io/UniGenDet/), [D³QE](https://ivg-yanranzhang.github.io/D3QE/), and [UniPre3D](https://ivg-yanranzhang.github.io/UniPre3D/). Titles and venues follow those official pages. The historical MoRe4D address returns 404; the current index uses MoGe4D. The upper-right More Works button opens a native popover with four linked project cards. It supports keyboard opening, Escape, outside-click dismissal and JavaScript-free navigation; the mobile chapter menu retains six chapters. The previous Read Paper navigation button and footer index have been removed.

Each benchmark case shows the common hidden-variable name once, followed by its two distinct values in the twin cards. Variable and value text uses 13px type without fragmenting identifiers on narrow phones. The shared rule and state transition remain available in the case disclosure, with 12px code that preserves line structure. The static B01 fallback uses the same card layout, including when the inventory request fails or JavaScript is disabled.

The public page lists all eight authors in the requested order, with Chan Yan Ki linked to the user-provided GitHub profile. Chan Yan Ki and Yanran Zhang share an asterisk denoting equal contribution. Wenzhao Zheng has a dagger denoting project leader. The two Tsinghua affiliations are merged into index 1; GigaAI is index 2. The three resource destinations for arXiv, Code and Benchmark remain intentionally unset, represented by disabled icon buttons until official URLs are supplied. Demo links to the playable worlds. The original supplied PDF remains unchanged.

The six section numbers now match the mobile contents exactly: generated worlds, research question, method, main results, benchmark explorer and paper/resources. This final pass changes chapter labels only; the established visual layout and research content remain in place.

## Source files

- `index.html`: narrative, diagrams, main result table, benchmark controls and resources.
- `static/css/project.css`: base layouts and typography.
- `static/css/cinematic.css`: final visual direction, responsive refinements and technical diagram.
- `static/css/cover.css`: editorial cover and responsive concept artwork.
- `static/css/benchmark-refinements.css`: recording previews and archived judgment links.
- `static/css/reading.css`: larger research type, compact layouts and responsive overrides.
- `static/css/replays.css`: uncropped English HUD replay presentation and six-world selector.
- `static/data/worlds.js`: six replay records, source hashes, full durations and preview ranges.
- `scripts/prepare_replays.py`: reproducible 24 fps H.264/AAC web encodes, previews and posters.
- `static/css/publication.css`: author and affiliation links, icon resources and the upper-right More Works popover.
- `static/js/project.js`: previews, replay dialog, runtime trace, case/model/probe selection, paired playback, shareable query state and citation copy.
- `static/data/benchmark.js`: ten curated cases, model registry and original recording metadata; private source paths are omitted.
- `static/data/showcase-descriptions.json`: downloadable case descriptions, explicitly scoped to the illustrative subset.
- `static/fonts/`: self-hosted Manrope and its OFL license.

No external fonts, runtime libraries or analytics are required. The recording inventory loads as the reader approaches the benchmark section, or immediately for a benchmark deep link. A failed inventory request exposes a retry button. The method illustration remains interactive before that request. Small dedicated scene thumbnails reduce first-screen traffic. The benchmark strip also uses independent 320px thumbnails (65,680 bytes for all ten, compared with 509,628 bytes for the full shared frames). The selected thumbnail stays horizontally visible without moving the reading position. Video requests are deferred until playback, except the desktop background preview; reduced-motion and mobile visitors receive a still poster until they explicitly play it. Comparisons pause when the workbench leaves view, and motion-preference changes pause automatic playback. The world preview stays paused throughout a full replay, including viewport and motion-preference changes. Closing the replay restores eligible desktop autoplay while preserving an explicit manual pause.

## Preview and verification

```bash
python3 -m http.server 8899
python3 scripts/validate_site.py
python3 scripts/validate_site.py --media
```

The default validator checks anchors/assets, ten curated cases, twelve model configurations, both probes/twins, judge-flag consistency, all 72 submission-table scores, JavaScript syntax and the anonymous PDF. `--media` additionally probes all 466 video files. Validation requires Python with Pillow and PyMuPDF, Node and FFmpeg.

Real Firefox and WebKit engine checks cover paired playback and controls at desktop/mobile sizes. Linux WebKit requires headless GStreamer test-environment settings; this is not verification on an Apple device. Real Chromium verification covers 1440px, 820px, 390px and 320px viewports; all 220 case/model/probe combinations; paired play/pause; rapid selection during loading; theme deep links; dialog loading and Escape close; clipboard copying; runtime-state switching; and reduced-motion/manual playback. Screenshot and test reports are review artifacts outside the public repository.

## Regenerate assets

```bash
python3 scripts/prepare_assets.py --paper /path/to/submission.pdf
python3 scripts/prepare_showcase.py --cases /path/to/benchmark/out/cases --runs /path/to/casebench/runs
```

The core asset script preserves the showcase recording inventory. Figure crop locations target this supplied 36-page submission and must be reviewed for a revised PDF. The showcase builder checks every recording's hidden value and expected answer before encoding. Its selected cases are explicitly listed in the script. When source roots were migrated, external `*-raw/videos` symlinks pointed to an old location; the builder reads the actual `runs/<model>/raw` and `raw_state` files instead.

## Replace recordings

Keep local manifests outside the repository because source paths may be private:

```json
[
  {
    "id": "B01",
    "twin": "A",
    "model": "minimax",
    "probe": "rule",
    "path": "/path/to/verified/B01-A.mp4"
  }
]
```

```bash
python3 scripts/import_videos.py /path/to/local-manifest.json
python3 scripts/validate_site.py
```

The builder and importer also synchronize the static B01 overview/method posters with the selected harness recordings. The validator checks that the runtime example matches the recording inventory.

Models accept registry keys or exact display names. Baseline probes are `rule` and `ending`; the harness uses `harness`. Optional `judge` metadata must belong to the exact new recording and contain consistent boolean `outcomeOk`, `counterOk`, `strictOk`, plus textual `observedEnding` and `evidence`. Omitting it removes the badge. The importer never transfers a prior clip's judgment to a replacement.

## Facts corrected from the previous page

Table 1 in the supplied PDF gives MiniMax-H3 EndFollow 66, Echo-WM Flash TwinContrast 42, and the model name Astra. The previous page had 60, 43, and Asra. The separate 32 → 64 → 92 component chain is distinguished from the six Table 1 columns. Its reported paired bootstrap intervals and exact McNemar tests are attributed to Appendix D.

At the user’s request, the page lists the eight authors and their personal or research profiles. Tsinghua affiliations are merged as affiliation 1; GigaAI is affiliation 2. The supplied PDF remains the original 36-page submission artifact. The citation includes the full author list.

## Publishable export

`python3 scripts/export_site.py --output /path/to/new-empty-directory` packages only the current page and referenced runtime assets, including the dynamic recording inventory. Historical templates, unrelated PDFs and internal handoff documents are excluded. The exported artifact has been checked with real mobile browser playback.

## Reading refinement

The runtime's actual code is12px, with13px ledger values and settled-state expressions. On the narrowest phones, nested card padding decreases so the original rule remains readable without breaking its condition across lines. Code whitespace is preserved, with local scrolling available for longer future examples. Five viewport sizes (320,768,1180,1280,1440px) were checked across all three browser engines, including red/blue state switching.

At721–1279px, the four runtime stages use two columns, keeping rule code and state labels legible instead of squeezing them into four narrow cards. Parallel benchmark players share intrinsic heading/media/footer rows where CSS subgrid is supported, aligning the video frames even when one instruction label wraps. The ordinary mobile stack is preserved. Alignment and runtime layout have been checked in Chromium, Firefox and WebKit at768,1024 and1440px, with actual playback and a resize back to390px also verified.

Mobile benchmark selectors use16px text and at least46px height. On screens up to480px wide, the model selector and instruction probe occupy separate full-width rows, preserving complete model names; the group playback button is also full-width with14px text and at least44px height. Scene thumbnail titles use12px text. Chromium, Firefox and WebKit playback checks cover390px,320px and667px layouts. The metric guide now explicitly states, as in PDFpage18, that initial-scene and action-onset checks are recorded separately and excluded from primary ending/forbidden-event scores.

The mobile header has a native six-chapter popover with keyboard/Escape behavior, focus return and active chapter indication. The author's subsequent feedback requested larger type and less empty space: primary body copy is now 17px on desktop and16px on mobile, captions/controls13–14px, the reading width increases to 1240px, and section padding decreases from104/66px to78/50px on desktop/mobile. Caption contrast and variable-font weight also increase slightly. Main-table scores are16px on desktop and15px on mobile. The standalone +60pp chart/callout has been removed at the user’s request: main results lead the chapter, with the32→64→92 controlled comparison in a compact disclosure after the table. Method explanations use direct state/rule/render steps, and the workbench explains that Rule+end adds an explicit final-state sentence to the original case-card instruction.

## Source and mobile-table refinement

The main-table guide defines all six metrics, grouped into clip-level (100videos per condition) and pair-level (50counterfactual pairs) measures. EndFollow explicitly evaluates the ending shown in final frames; CntAbsent covers the entire clip; Strict requires both. The definitions were checked against AppendixB.1 on PDFpage18, which is linked directly. The compact controlled-comparison disclosure also states that the component-chain study is reported separately from the main table.

Direct references now open the actual submission pages for Table1 (page7), the full both-probe grid/Table4 (page21), WBench/Table2 (page9), and the human-audit results (page19). The preference text specifies four Rule-only opponents and split auditor votes. The table note makes clear that both metric groups use one deployed harness condition. On mobile, a fixed-width metric grid keeps backend names and category labels visible while scrolling; metric headings wrap and the direction symbols are omitted because the caption already says higher is better.

## Benchmark preview refinement

Individual playback is tracked separately from a requested four-clip comparison. Ending a single clip does not mark the whole comparison as replayed. Pausing every clip through its native controls updates the group button, and changing the selection resets group playback history. These end/pause/reset sequences have been checked in Chromium, Firefox and WebKit on desktop and mobile. The playback note says that all recordings play from their beginnings with their original durations; it does not imply frame-level alignment.

Each recording initially shows its verified final frame with an explicit “Play full clip” button. Native video controls activate when playback is requested, avoiding idle buffering indicators on untouched previews. Keyboard activation moves focus to the video controls. The four-clip comparison button remains available; changing the model or probe recreates clean previews. Hidden state values now accompany each twin's required ending directly above its videos. Single-clip and four-clip playback, keyboard focus transfer and model replacement have been checked on desktop/mobile in Chromium, Firefox and WebKit.

VLM verdict labels open and focus the exact archived evidence for that model and twin. The disclosure state stays synchronized when the baseline changes or the native details element closes. A short note explains why a correct final frame can still fail a strict judgment when forbidden content appeared earlier; the recorded verdict is preserved. Both paper figures now reserve their intrinsic image dimensions before lazy loading, and Figure6 includes a visible link to its original-resolution image.

## Sharing cover

The page has a dedicated 1200×630 JPEG cover rendered from native HTML/CSS and the original layered-world conceptual illustration. `python3 scripts/prepare_social_card.py` regenerates it with Playwright. Open Graph metadata includes the canonical page URL, absolute cover URL, dimensions and alternate description; large-image card metadata shares the same research title. Metadata follows the [Open Graph protocol](https://ogp.me/).

## Editorial cover and generated worlds

Cover artwork selection now uses width-based `srcset` and `sizes` matched to the actual layout. Standard-density desktops download the768px file; high-density displays can use1536px, including phones at3× density. The short landscape layout has its own size estimate. Eighteen viewport/density/browser combinations have been checked, along with WebP fallback. A local150ms/250KB/s diagnostic reduced desktop LCP from about3.0s to1.9s; this is a controlled browser observation, not a public Lighthouse score.

Intermediate viewport refinement keeps the cover's action labels on one line with compact metadata. The later public author block supersedes the intermediate anonymous authorship note. Short landscape phones use a two-column cover so the illustration appears alongside the title; the ordinary portrait layout remains spacious enough to read. Twelve viewport/engine combinations (Chromium, Firefox and WebKit at768×1024,1024×768,667×375 and568×320) have been checked for overflow and usable chapter navigation.

The cream editorial cover uses an original architectural maquette: a generated environment above a rule plane and a structured state layer. It is explicitly captioned as a concept illustration and is separate from the real game recordings, benchmark inputs and recorded final frames. The original artwork was created with the built-in imagegen tool; a transparent-background edit isolated the maquette, followed by ordinary WebP resizing for desktop/mobile delivery. Provenance and prompt descriptions are in `static/images/concepts/README.md`.

Headline metrics follow the cover, then the three actual generated worlds have their own video section. Chapter navigation tracks their position, and the video observer pauses when this section leaves view. The cover uses a 768px asset on mobile and a 1536px asset on larger screens. AVIF files are about80/203KB, with124/347KB WebP fallbacks. `python3 scripts/prepare_cover_assets.py /path/to/selected-original.png` regenerates these derivatives. Desktop/mobile AVIF decoding has been checked in Chromium, Firefox and WebKit; forcing an unsupported source type verifies WebP fallback. The export and static validators include `srcset` assets. Native typography and links remain selectable and accessible.
