"""Build ten curated counterfactual examples and their original model recordings.

The showcase is illustrative. Aggregate scores stay sourced from the paper.
Inputs: --cases /path/to/benchmark/out/cases --runs /path/to/casebench/runs
"""
from site_data import sync_example_posters
from media_assets import extract_final_frame
import argparse
from concurrent.futures import ThreadPoolExecutor, as_completed
import hashlib
import json
from pathlib import Path
import subprocess
from PIL import Image

ROOT=Path(__file__).resolve().parents[1]
SELECTED=['B01','B02','B08','B19','B20','B26','B29','B41','B50','B35']
MODELS=[
 dict(key='ours',name='Stateful Harness',backbone='MiniMax-H3',kind='Stateful runtime',run='ref2va-firstframe-50'),
 dict(key='minimax',name='MiniMax-H3',kind='Image-to-video',run='baseline'),
 dict(key='wan22',name='Wan2.2 A14B',kind='Image-to-video'),
 dict(key='longcat',name='LongCat-Video 13.6B',kind='Image-to-video'),
 dict(key='hy15',name='HunyuanVideo 1.5',kind='Image-to-video'),
 dict(key='lingbot',name='LingBot-World v2',kind='Interactive world model'),
 dict(key='echo',name='Echo-WM Flash',kind='Interactive world model'),
 dict(key='fantasyworld',name='FantasyWorld',kind='Interactive world model'),
 dict(key='alayaworld',name='AlayaWorld',kind='Interactive world model'),
 dict(key='inspatio',name='InSpatio-World',kind='Interactive world model'),
 dict(key='astra',name='Astra',kind='Interactive world model'),
 dict(key='worldplay',name='HY-WorldPlay',kind='Interactive world model')
]
NAMES={'B01':'Elemental Orb','B02':'Gate or Brazier','B08':'Signal at the Camp','B19':'Ice or Fire','B20':'Shield or Armor','B26':'Guard or Alarm','B29':'A Kitchen Trigger','B41':'A Garden Encounter','B50':'Left or Right','B35':'The Gallery · Failure Case'}

def transcode(job):
    source=job['source']
    fingerprint=hashlib.sha256(source.read_bytes()).hexdigest()[:10]
    name=f"{job['model']}-{job['track']}-{job['id']}-{job['side']}-{fingerprint}"
    video=ROOT/f'static/videos/benchmark/{name}.mp4'
    poster=ROOT/f'static/images/benchmark/{name}.webp'
    if not video.exists():
        subprocess.run(['ffmpeg','-y','-v','error','-threads','2','-i',str(source),'-vf','scale=768:-2','-c:v','libx264','-threads','2','-crf','26','-preset','medium','-pix_fmt','yuv420p','-an','-movflags','+faststart',str(video)],check=True)
    if not poster.exists():
        extract_final_frame(video, poster)
    info=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','json',str(video)]))
    row=job['row']
    return job,dict(src=video.relative_to(ROOT).as_posix(),poster=poster.relative_to(ROOT).as_posix(),duration=round(float(info['format']['duration']),2),judge=dict(outcomeOk=row['outcome_ok'],counterOk=row['counter_ok'],strictOk=row['strict_ok'],observedEnding=row['outcome_answer'],evidence=row.get('evidence','')))

def main():
    parser=argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--cases',type=Path,required=True)
    parser.add_argument('--runs',type=Path,required=True)
    parser.add_argument('--workers',type=int,default=4)
    args=parser.parse_args()
    samples=[];jobs=[]
    for cid in SELECTED:
        folder=args.cases/cid
        a=json.loads((folder/'case_A.json').read_text());b=json.loads((folder/'case_B.json').read_text())
        Image.open(folder/'input.png').convert('RGB').resize((960,540)).save(ROOT/f'static/images/benchmark/{cid}.webp',quality=88)
        samples.append(dict(id=cid,name=NAMES[cid],theme=a['genre'].replace('_',' '),variable=a['hidden_state']['variable'],values=[a['hidden_state']['A'],a['hidden_state']['B']],action=a['shared_action'],rule=a['rule']['text'],endings=[a['gold_A'],a['gold_B']],forbidden=[a['terminal_visual_states']['not_occurs']['phrase'],b['terminal_visual_states']['not_occurs']['phrase']],program=a['rule'],image=f'static/images/benchmark/{cid}.webp',failureCase=cid=='B35',recordings={}))
    by_id={sample['id']:sample for sample in samples}
    for model in MODELS:
        tracks=['harness'] if model['key']=='ours' else ['rule','ending']
        for track in tracks:
            if model['key']=='ours':
                run=args.runs/model['run'];sources=run/'videos'
            elif model['key']=='minimax':
                run=args.runs/('baseline-raw' if track=='rule' else 'baseline-raw-state');sources=run/'videos'
            else:
                run=args.runs/f"{model['key']}-{'raw' if track=='rule' else 'raw-state'}"
                sources=args.runs/model['key']/('raw' if track=='rule' else 'raw_state')
            rows={row['clip_id']:row for row in json.loads((run/'metrics.json').read_text())['rows']}
            for cid in SELECTED:
                by_id[cid]['recordings'].setdefault(model['key'],{}).setdefault(track,{})
                for side in ['A','B']:
                    clip=f'{cid}-{side}';source=sources/f'{clip}.mp4'
                    if not source.is_file() or clip not in rows:raise ValueError(f'Missing recording or judge for {model["key"]}/{track}/{clip}')
                    row=rows[clip]
                    case=json.loads((args.cases/cid/f'case_{side}.json').read_text())
                    assert row['hidden_value']==case['initial_state'][case['hidden_state']['variable']]
                    assert row['outcome_expected']==case['judge']['outcome_question']['expected']
                    jobs.append(dict(model=model['key'],track=track,id=cid,side=side,source=source,row=row))
    print(f'Validated {len(jobs)} source recordings and gold/judge mappings before encoding.',flush=True)
    with ThreadPoolExecutor(max_workers=args.workers) as pool:
        for count,future in enumerate(as_completed([pool.submit(transcode,job) for job in jobs]),1):
            job,record=future.result()
            by_id[job['id']]['recordings'][job['model']][job['track']][job['side']]=record
            if count%20==0 or count==len(jobs):print(f'Encoded {count}/{len(jobs)} clips.',flush=True)
    public_models=[{key:value for key,value in model.items() if key!='run'} for model in MODELS]
    (ROOT/'static/data/benchmark.js').write_text('window.SWM_MODELS = '+json.dumps(public_models,ensure_ascii=False,separators=(',',':'))+';\nwindow.SWM_SAMPLES = '+json.dumps(samples,ensure_ascii=False,separators=(',',':'))+';\n')
    sync_example_posters(ROOT, samples)
    print('Showcase complete: 10 pairs, 11 baselines + Stateful Harness, both twins, both baseline probes.',flush=True)

if __name__=='__main__':main()
