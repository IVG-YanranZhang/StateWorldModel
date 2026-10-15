"""Prepare the six requested English HUD replays without cropping or changing content."""
from pathlib import Path
from concurrent.futures import ThreadPoolExecutor
import subprocess,json,hashlib
ROOT=Path(__file__).resolve().parents[1]
SOURCE=Path('/data/chenrenqi/code/release_workspace/agentic_game/generated/replay_huds')
SPECS=[
 ('moon-dragon','Moon Dragon','Duel','duel_en/duel_moon_dragon_swordsman_7_15t_lost_replay_hud.mp4',28,'A 15-turn duel against the Moon Dragon. The English HUD exposes health, resources, actions and enemy moves; the recorded session ends in a loss.'),
 ('erii-sakura','Erii Sakura','Narrative','adv_eng/tokyo_eri_sakura_7_25t_won_replay_hud.mp4',60,'A 25-turn dating narrative with Erii Uesugi. Follow dialogue, relationship changes and chapter progression through a completed story.'),
 ('oracle-machine','Oracle Machine','Duel','duel_en/duel_oracle_machine_epic_7_15t_lost_replay_hud.mp4',28,'A 15-turn duel against the Six-Winged Arbiter. Action descriptions and the state ledger remain visible throughout this recorded loss.'),
 ('shogun-palace','Shogun Palace','Duel','duel_en/duel_shogun_mask_palace_epic_7_15t_lost_replay_hud.mp4',28,'A 15-turn shrine-maiden duel against the Hundred-Mask Oni General, with English action and state overlays. The recorded session ends in a loss.'),
 ('starlight-yui','Starlight Yui','Narrative','adv_eng/starlight_sister_yui_7_25t_won_replay_hud.mp4',60,'A 25-turn narrative with Yui Shiraha. The English HUD tracks relationship, mood and story chapters through a completed episode.'),
 ('eclipse-devourer','Eclipse Devourer','Duel','duel_en/duel_eclipse_devourer_epic_7_14t_lost_replay_hud.mp4',28,'A 14-turn occultist duel against the World Devourer. Inspect attacks, wards and resource changes in the full recorded session, which ends in a loss.'),
]
def run(args):subprocess.run(['ffmpeg','-v','error','-nostdin','-y',*args],check=True)
def prepare(spec):
 key,name,genre,rel,start,desc=spec;src=SOURCE/rel
 dest=f'static/videos/replays/{key}.mp4';preview=f'static/videos/worlds/{key}-preview.mp4';poster=f'static/images/games/{key}.webp';thumb=f'static/images/games/{key}-thumb.webp'
 for f in [dest,preview,poster,thumb]:(ROOT/f).parent.mkdir(parents=True,exist_ok=True)
 base=['-i',str(src),'-map','0:v:0','-map','0:a:0?','-vf','fps=24,format=yuv420p','-c:v','libx264','-preset','medium','-crf','20','-threads','4','-c:a','aac','-b:a','128k','-movflags','+faststart']
 run([*base,str(ROOT/dest)])
 run(['-ss',str(start),'-i',str(src),'-t','20','-an','-vf','fps=24,format=yuv420p','-c:v','libx264','-preset','medium','-crf','22','-threads','4','-movflags','+faststart',str(ROOT/preview)])
 for f,scale in [(poster,'864:480'),(thumb,'180:100')]:run(['-ss',str(start+6),'-i',str(src),'-frames:v','1','-vf',f'scale={scale}','-c:v','libwebp','-quality','85',str(ROOT/f)])
 info=json.loads(subprocess.check_output(['ffprobe','-v','error','-show_format','-of','json',str(src)]));duration=float(info['format']['duration'])
 print(key,'prepared',flush=True)
 return {'id':key,'name':name,'genre':genre,'description':desc,'src':dest,'preview':preview,'poster':poster,'thumbnail':thumb,'duration':duration,'previewStart':start,'previewDuration':20,'sourceFile':src.name,'sourceSha256':hashlib.sha256(src.read_bytes()).hexdigest()}
if __name__=='__main__':
 with ThreadPoolExecutor(max_workers=6) as pool:rows=list(pool.map(prepare,SPECS))
 (ROOT/'static/data/worlds.js').write_text('window.SWM_WORLDS = '+json.dumps(rows,indent=2)+';\n')
