"""Validate project-page assets, data integrity and submission table values."""
import argparse
import json
from pathlib import Path
import re
import subprocess
from html.parser import HTMLParser
from urllib.parse import urlsplit
from PIL import Image
import pymupdf as fitz

ROOT=Path(__file__).resolve().parents[1]
class PageParser(HTMLParser):
    def __init__(self):
        super().__init__();self.ids=[];self.refs=[];self.rows=[];self.in_table=False;self.row=None;self.cell=None
    def handle_starttag(self,tag,attrs):
        attrs=dict(attrs)
        if 'id' in attrs:self.ids.append(attrs['id'])
        for name in ['src','href','poster']:
            if name in attrs:self.refs.append(attrs[name])
        if tag=='table' and attrs.get('id')=='results-table':self.in_table=True
        if self.in_table and tag=='tr':self.row=[]
        if self.in_table and tag in ['th','td']:self.cell=''
    def handle_data(self,data):
        if self.cell is not None:self.cell+=data
    def handle_endtag(self,tag):
        if self.in_table and tag in ['th','td'] and self.cell is not None:
            self.row.append(self.cell.strip());self.cell=None
        if self.in_table and tag=='tr':self.rows.append(self.row);self.row=None
        if tag=='table':self.in_table=False

page=PageParser();page.feed((ROOT/'index.html').read_text())
assert len(page.ids)==len(set(page.ids)), 'Duplicate HTML ids'
for ref in page.refs:
    if ref.startswith('#'):assert ref[1:] in page.ids, f'Broken anchor {ref}'
    elif not re.match(r'^[a-z]+:',ref):
        parsed=urlsplit(ref)
        if parsed.path:assert (ROOT/parsed.path).is_file(),f'Missing asset {ref}'
        elif parsed.fragment:assert parsed.fragment in page.ids,f'Broken query anchor {ref}'
parser=argparse.ArgumentParser(description=__doc__)
parser.add_argument('--media',action='store_true',help='Probe every generated video; use when media assets change.')
args=parser.parse_args()
models_text,samples_text=(ROOT/'static/data/benchmark.js').read_text().split('\nwindow.SWM_SAMPLES = ',1)
models=json.loads(models_text.removeprefix('window.SWM_MODELS = ').rstrip(';\n'))
data=json.loads(samples_text.rstrip(';\n'))
b01 = next(sample for sample in data if sample['id']=='B01')
html = (ROOT/'index.html').read_text()
for side in ['A','B']:
    poster = b01['recordings']['ours']['harness'][side]['poster']
    assert f'data-poster-{side.lower()}="{poster}"' in html, 'Runtime illustration is stale'
assert len(data)==10
assert len({sample['id'] for sample in data})==10
assert len(models)==12 and len({model['key'] for model in models})==12
assert {model['key'] for model in models}=={'ours','minimax','wan22','longcat','hy15','lingbot','echo','fantasyworld','alayaworld','inspatio','astra','worldplay'}
video_paths=set()
for sample in data:
    assert len(sample['values'])==2 and sample['values'][0]!=sample['values'][1]
    assert len(sample['endings'])==2 and sample['endings'][0]!=sample['endings'][1]
    assert sample['rule'] and sample['action']
    assert sample['program']['precondition'] and sample['program']['effect'] and sample['program']['else_effect']
    assert Image.open(ROOT/sample['image']).size==(960,540)
    assert set(sample['recordings'])=={model['key'] for model in models}
    for model,tracks in sample['recordings'].items():
        assert set(tracks)==({'harness'} if model=='ours' else {'rule','ending'})
        for track,twins in tracks.items():
            assert set(twins)=={'A','B'}
            for record in twins.values():
                assert (ROOT/record['src']).is_file() and (ROOT/record['poster']).is_file()
                assert not record['src'].startswith('/') and not record['poster'].startswith('/')
                if record.get('judge') is not None:
                    assert record['judge']['strictOk']==(record['judge']['outcomeOk'] and record['judge']['counterOk'])
                assert record['duration']>0
                video_paths.add(record['src'])
assert len(video_paths)==460
expected={
 'Wan2.2 A14B':[65,32,38,54,63,26], 'LongCat-Video 13.6B':[47,8,24,46,62,8],
 'HunyuanVideo 1.5':[57,20,26,29,30,4], 'MiniMax-H3':[66,32,32,29,30,4],
 'LingBot-World v2':[48,16,38,44,76,14], 'Echo-WM Flash':[57,26,42,43,60,8],
 'FantasyWorld':[34,8,30,35,81,8], 'AlayaWorld':[37,12,28,33,85,6],
 'InSpatio-World':[19,2,14,17,92,4], 'Astra':[11,0,14,16,96,0],
 'HY-WorldPlay':[9,0,4,7,94,0], 'Stateful Harness Ours':[96,92,96,95,98,90]}
actual={row[0]:list(map(int,row[1:])) for row in page.rows if len(row)==7 and row[0] in expected}
assert actual==expected, 'Main table does not match the submission'
world_names=['duel_moon_dragon','romance','openworld']
world_paths=[f'static/videos/{name}.mp4' for name in world_names]+[f'static/videos/worlds/{name}-preview.mp4' for name in world_names]
for path in world_paths:assert (ROOT/path).is_file()
if args.media:
    for path in sorted(video_paths)+world_paths:
        info=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','stream=codec_name,width,height','-show_entries','format=duration','-of','json',str(ROOT/path)]))
        assert float(info['format']['duration'])>0
        assert any(stream.get('codec_name')=='h264' for stream in info['streams'])
pdf=fitz.open(ROOT/'static/pdfs/state-world-models.pdf')
assert len(pdf)==36 and not pdf.metadata.get('author')
assert 'Anonymous' in pdf[0].get_text()
subprocess.run(['node','--check',str(ROOT/'static/js/project.js')],check=True)
subprocess.run(['node','--check',str(ROOT/'static/data/benchmark.js')],check=True)
print(f'PASS: {len(page.ids)} unique HTML ids; 10 curated pairs; 12 model configurations; 72 submission-table scores; 460 paired recordings; 6 world videos; anonymous 36-page PDF; JS syntax.')
print('Full video probes: '+('completed' if args.media else 'not requested')+'. Browser rendering and playback are checked separately.')
