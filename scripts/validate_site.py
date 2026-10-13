"""Validate project-page assets, data integrity and submission table values."""
import json
from pathlib import Path
import re
import subprocess
from html.parser import HTMLParser
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
    elif not re.match(r'^[a-z]+:',ref):assert (ROOT/ref).is_file(),f'Missing asset {ref}'
data=json.loads((ROOT/'static/data/benchmark.js').read_text().removeprefix('window.SWM_SAMPLES = ').rstrip(';\n'))
assert len(data)==50
assert {s['id'] for s in data}=={f'B{i:02d}' for i in range(1,51)}
assert len({s['theme'] for s in data})==21
assert len({s['variable'] for s in data})==49
video_paths=set()
for sample in data:
    assert len(sample['values'])==2 and sample['values'][0]!=sample['values'][1]
    assert len(sample['endings'])==2 and sample['endings'][0]!=sample['endings'][1]
    assert sample['rule'] and sample['action']
    assert sample['program']['precondition'] and sample['program']['effect'] and sample['program']['else_effect']
    assert Image.open(ROOT/sample['image']).size==(960,540)
    for video in sample['videos']:
        assert video['twin'] in ['A','B']
        assert (ROOT/video['src']).is_file() and (ROOT/video['poster']).is_file()
        assert not video['src'].startswith('/') and not video['poster'].startswith('/')
        video_paths.add(video['src'])
expected={
 'Wan2.2 A14B':[65,32,38,54,63,26], 'LongCat-Video 13.6B':[47,8,24,46,62,8],
 'HunyuanVideo 1.5':[57,20,26,29,30,4], 'MiniMax-H3':[66,32,32,29,30,4],
 'LingBot-World v2':[48,16,38,44,76,14], 'Echo-WM Flash':[57,26,42,43,60,8],
 'FantasyWorld':[34,8,30,35,81,8], 'AlayaWorld':[37,12,28,33,85,6],
 'InSpatio-World':[19,2,14,17,92,4], 'Astra':[11,0,14,16,96,0],
 'HY-WorldPlay':[9,0,4,7,94,0], 'Stateful Harness Ours':[96,92,96,95,98,90]}
actual={row[0]:list(map(int,row[1:])) for row in page.rows if len(row)==7 and row[0] in expected}
assert actual==expected, 'Main table does not match the submission'
for path in list(video_paths)+[f'static/videos/{name}.mp4' for name in ['duel_moon_dragon','romance','openworld']]:
    info=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','stream=codec_name,width,height','-show_entries','format=duration','-of','json',str(ROOT/path)]))
    assert float(info['format']['duration'])>0
    assert any(s.get('codec_name')=='h264' for s in info['streams'])
pdf=fitz.open(ROOT/'static/pdfs/state-world-models.pdf')
assert len(pdf)==36 and not pdf.metadata.get('author')
assert 'Anonymous' in pdf[0].get_text()
subprocess.run(['node','--check',str(ROOT/'static/js/project.js')],check=True)
subprocess.run(['node','--check',str(ROOT/'static/data/benchmark.js')],check=True)
print(f'PASS: {len(page.ids)} anchors; 50 pairs; 21 themes; 49 variables; 72 table scores; {len(video_paths)+3} H.264 videos; 36-page anonymous PDF; JS syntax.')
print('Browser rendering and remote media collection are separate checks, not covered by this validator.')
