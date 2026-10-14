"""Extract native-resolution stills from the supplied paper's Figure 6."""

import argparse
import hashlib
import io
import json
from pathlib import Path

import pymupdf
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]


def prepare_episode_frames(pdf, destination):
    if len(pdf) != 36 or "Figure 6:" not in pdf[8].get_text():
        raise ValueError("Review Figure 6 placement for a revised paper.")
    page = pdf[8]
    placements = []
    for info in page.get_images(full=True):
        for rect in page.get_image_rects(info[0]):
            if 109 < rect.x0 < rect.x1 < 505 and 236 < rect.y0 < rect.y1 < 397 and rect.width > 40:
                placements.append((rect.y0, rect.x0, info[0], rect))
    placements.sort(key=lambda item: (item[0], item[1]))
    if len(placements) != 24:
        raise ValueError("Expected three episode rows, each with four paired steps.")
    destination.mkdir(parents=True, exist_ok=True)
    provenance = {"figure": 6, "pdfPage": 9, "selection": "Second published still in each sampled step", "frames": []}
    for row, episode in enumerate(["town", "dating", "duel"]):
        entries = placements[row * 8 : (row + 1) * 8]
        if max(item[0] for item in entries) - min(item[0] for item in entries) > 0.1:
            raise ValueError("Figure 6 row placement changed; review the extraction.")
        for step, entry in enumerate(entries[1::2], start=1):
            raw = pdf.extract_image(entry[2])["image"]
            image = Image.open(io.BytesIO(raw)).convert("RGB")
            if image.size != (864, 480):
                raise ValueError("Expected the original 864 × 480 episode frame.")
            filename = f"{episode}-{step}.webp"
            image.save(destination / filename, quality=86, method=6)
            provenance["frames"].append({
                "file": filename,
                "sourceRect": [round(value, 4) for value in entry[3]],
                "sourceImageSha256": hashlib.sha256(raw).hexdigest(),
                "width": 864,
                "height": 480,
            })
    (destination / "provenance.json").write_text(json.dumps(provenance, indent=2) + "\n")
    return provenance


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--paper", type=Path, required=True)
    args = parser.parse_args()
    with pymupdf.open(args.paper) as pdf:
        manifest = prepare_episode_frames(pdf, ROOT / "static/images/paper/episodes")
    print(f"Extracted {len(manifest['frames'])} published episode stills without resizing.")


if __name__ == "__main__":
    main()
