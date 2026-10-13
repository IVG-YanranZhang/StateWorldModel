"""Prepare core paper illustrations, anonymous PDF and modern world posters.

This does not modify the curated benchmark data or its recording inventory.
Run prepare_showcase.py separately to rebuild the ten-pair showcase.
"""
import argparse
from pathlib import Path
import pymupdf as fitz
from PIL import Image, ImageOps
ROOT=Path(__file__).resolve().parents[1]

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--paper',type=Path,required=True)
    args=parser.parse_args()
    pdf=fitz.open(args.paper)
    if len(pdf)!=36 or 'Figure 4:' not in pdf[7].get_text() or 'Figure 6:' not in pdf[8].get_text():
        raise ValueError('The figure crops target the supplied 36-page submission. Review crop locations for a revised PDF.')
    pdf[7].get_pixmap(matrix=fitz.Matrix(3,3),clip=fitz.Rect(109,80,502,304)).save(str(ROOT/'static/images/paper/benchmark-comparison.png'))
    pdf[8].get_pixmap(matrix=fitz.Matrix(4,4),clip=fitz.Rect(109,236,505,397)).save(str(ROOT/'static/images/paper/swm_multiturn.png'))
    for name in ['swm_multiturn','benchmark-comparison']:
        Image.open(ROOT/f'static/images/paper/{name}.png').convert('RGB').save(ROOT/f'static/images/paper/{name}.webp',quality=92,method=6)
    pdf.set_metadata({})
    pdf.save(str(ROOT/'static/pdfs/state-world-models.pdf'),garbage=4,deflate=True)
    for name in ['duel_moon_dragon','romance','openworld']:
        image=Image.open(ROOT/f'static/images/games/{name}.png').convert('RGB')
        ImageOps.fit(image,(180,120),method=Image.Resampling.LANCZOS).save(ROOT/f'static/images/games/{name}-thumb.webp',quality=80,method=6)
        image.thumbnail((1440,900))
        image.save(ROOT/f'static/images/games/{name}.webp',quality=82 if name=='duel_moon_dragon' else 88)
    print('Prepared anonymous paper, Figures 4/6 and three world posters; showcase data retained.')

if __name__=='__main__':main()
