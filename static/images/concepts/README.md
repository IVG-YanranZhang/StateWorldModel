# Original conceptual cover artwork

These assets illustrate the paper's conceptual division between explicit state,
executable rules and generated pixels. They are editorial artwork, not model
evaluation outputs, and are captioned accordingly on the project page.

Created with the built-in `image_gen.imagegen` tool on 2026-10-14. The original
1536×1024 PNG files are retained in the local review workspace. The project uses
transparent AVIF derivatives at 1536×1024 and 768×512, quality70, with WebP
fallbacks at quality88. AVIF assets are 203,135 and79,729bytes respectively,
about41% and36% smaller than the equivalent WebP files. Benchmark
inputs, videos and recorded final frames have not been generatively edited.

Generation prompt: create a premium tactile architectural maquette in three
layers, a miniature fantasy stone hall with white/red/blue orbs above a
translucent executable rule plane above a dark green structured state layer.
Use ivory gallery lighting, frosted glass, stone, muted moss green and restrained
red/blue pathways. Compose on the right for live HTML title text. No letters,
logos, numerical metrics or watermark; clearly conceptual editorial art.

Edit prompt: remove the studio background and floor to produce genuine
transparency around and between the layers. Preserve the architecture,
geometry, materials, camera angle, lighting and orb colors. Keep the full
maquette visible; add no text, labels, logos or objects.

The user-provided MirroS HarnessEval page inspired the attention to physical
depth and meaningful composition. No MirroS assets, branding or text were
reused.

`python3 scripts/prepare_cover_assets.py /path/to/selected-original.png`
regenerates the responsive browser assets. The source must retain transparency;
Pillow needs AVIF encoder support. This command performs ordinary resizing and
format encoding and does not regenerate or alter benchmark evidence.
