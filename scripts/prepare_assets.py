"""Prepare public, anonymous benchmark content from verified local sources."""
import argparse
import json
from pathlib import Path
import subprocess
import pymupdf as fitz
from PIL import Image
ROOT=Path(__file__).resolve().parents[1]
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--benchmark-root',type=Path,required=True)
parser.add_argument('--paper',type=Path,required=True)
args=parser.parse_args()
SRC=args.benchmark_root
samples=[]
for folder in sorted((SRC/'out/cases').iterdir()):
    if not (folder/'case_A.json').exists(): continue
    a=json.loads((folder/'case_A.json').read_text()); b=json.loads((folder/'case_B.json').read_text())
    cid=folder.name
    Image.open(folder/'input.png').convert('RGB').resize((960,540)).save(ROOT/f'static/images/benchmark/{cid}.webp',quality=86)
    samples.append(dict(id=cid,theme=a['genre'].replace('_',' '),family=a['interaction_family'].replace('_',' '),image=f'static/images/benchmark/{cid}.webp',variable=a['hidden_state']['variable'],values=[a['hidden_state']['A'],a['hidden_state']['B']],action=a['shared_action'],rule=a['rule']['text'],endings=[a['gold_A'],a['gold_B']],forbidden=[a['terminal_visual_states']['not_occurs']['phrase'],b['terminal_visual_states']['not_occurs']['phrase']],program=a['rule'],videos=[]))
# A local run is not assigned to a paper probe without verified prompt metadata.
vsrc=SRC/'runs/longcat/raw_state/B01-A.mp4'
vdst=ROOT/'static/videos/benchmark/longcat-B01-A.mp4'
subprocess.run(['ffmpeg','-y','-v','error','-i',str(vsrc),'-vf','scale=854:-2','-c:v','libx264','-crf','24','-preset','fast','-an','-movflags','+faststart',str(vdst)],check=True)
subprocess.run(['ffmpeg','-y','-v','error','-i',str(vdst),'-frames:v','1',str(ROOT/'static/images/benchmark/longcat-B01-A.webp')],check=True)
samples[0]['videos']=[dict(model='LongCat-Video 13.6B',twin='A',track='Local run · probe unverified',src='static/videos/benchmark/longcat-B01-A.mp4',poster='static/images/benchmark/longcat-B01-A.webp')]
(ROOT/'static/data/benchmark.js').write_text('window.SWM_SAMPLES = '+json.dumps(samples,ensure_ascii=False,indent=2)+';\n')
pdf=fitz.open(args.paper)
pdf[7].get_pixmap(matrix=fitz.Matrix(3,3),clip=fitz.Rect(109,80,502,304)).save(str(ROOT/'static/images/paper/benchmark-comparison.png'))
# Dedicated, correct submission PDF; prior template PDFs belong to another paper.
pdf.set_metadata({})
pdf.save(str(ROOT/'static/pdfs/state-world-models.pdf'),garbage=4,deflate=True)
# Keep full-resolution original posters, serve smaller modern images on the page.
for name in ['duel_moon_dragon','romance','openworld']:
    im=Image.open(ROOT/f'static/images/games/{name}.png').convert('RGB')
    im.thumbnail((1440,900)); im.save(ROOT/f'static/images/games/{name}.webp',quality=88)
print(f'Prepared {len(samples)} samples, one verified local video, Figure 4, and anonymous paper.')
