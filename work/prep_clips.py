import json, glob, os, subprocess

GAMES = ['angry_birds_sling', 'pvz_garden', 'pacman_blue_hour', 'pokemon_style_duel',
         'mario_blocks', 'temple_run_forks', 'street_fighter_duel', 'cs_aim_duel',
         'monopoly_lane']
GEN = '/data/chenrenqi/code/release_workspace/agentic_game/generated/_trash2'
os.makedirs('static/videos', exist_ok=True)

for gid in GAMES:
    ds = sorted([d for d in glob.glob(f'{GEN}/{gid}/run-*')
                 if os.path.exists(d + '/game_montage.mp4')], key=os.path.getmtime)
    if not ds:
        print('SKIP:', gid)
        continue
    src = ds[-1] + '/game_montage.mp4'
    out = f'static/videos/{gid}.mp4'
    subprocess.run(['ffmpeg', '-y', '-loglevel', 'error', '-i', src, '-t', '24',
                    '-vf', 'scale=854:-2', '-c:v', 'libx264', '-crf', '27',
                    '-preset', 'medium', '-an', '-movflags', '+faststart', out],
                   check=True)
    print(f'{gid}: {os.path.getsize(out)/1e6:.1f}MB')
