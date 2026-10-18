"""Sharper hero previews: Real-ESRGAN x2 of the native 864×480 HUD replays → 1728×960 previews and posters.

/data/chenrenqi/demo_video/work/venv_sr/bin/python scripts/upscale_previews.py [--gpus 0,1,2,3,4,5] [--only ID ...] [--encode-only]
Same source files and preview windows as prepare_replays.py (start offset, 20 s, no audio); only the
resolution changes. The SR output is blended 80/20 with a bicubic upscale (as in the project film) to keep
textures temporally stable. The poster is the preview frame at +6 s, matching prepare_replays.py.
The SR frames are kept as a lossless intermediate (outside the repository) so the web encode can be re-tuned
with --encode-only; the encode targets ≈2.5 Mbit/s so a 20 s preview stays near 6 MB on slow connections.
"""
import argparse, os, subprocess, sys
from multiprocessing import Process, Queue
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / 'scripts'))
from prepare_replays import SOURCE, SPECS

WEIGHTS = '/data/chenrenqi/demo_video/work/dl/sr/RealESRGAN_x2.pth'
W, H, FPS, DUR = 1728, 960, 24, 20
STAGE = Path('/data/chenrenqi/demo_video/work/site_sr')          # lossless SR intermediates
WEB = ['-c:v', 'libx264', '-preset', 'veryslow', '-crf', '24', '-maxrate', '3M', '-bufsize', '6M', '-g', '48', '-pix_fmt', 'yuv420p',
       '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv', '-movflags', '+faststart', '-an']

def encode(key):
    src, out = STAGE / f'{key}.mkv', ROOT / f'static/videos/worlds/{key}-preview.mp4'
    subprocess.run(['ffmpeg', '-v', 'error', '-nostdin', '-y', '-i', str(src), *WEB, str(out)], check=True)
    print(f'{key}: {out.name} {out.stat().st_size / 1e6:.1f} MB', flush=True)

def worker(gpu, q):
    os.environ['CUDA_VISIBLE_DEVICES'] = str(gpu)
    os.environ['DISABLE_ADDMM_CUDA_LT'] = '1'
    import numpy as np, torch
    import torch.nn.functional as F
    from PIL import Image
    from spandrel import ModelLoader
    model = ModelLoader().load_from_file(WEIGHTS).cuda().eval().half()
    while (spec := q.get()) is not None:
        key, _, _, rel, start, _ = spec
        poster = ROOT / f'static/images/games/{key}.webp'
        dec = subprocess.Popen(['ffmpeg', '-v', 'error', '-nostdin', '-ss', str(start), '-i', str(SOURCE / rel), '-t', str(DUR),
                                '-vf', f'fps={FPS}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
        STAGE.mkdir(parents=True, exist_ok=True)
        enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-nostdin', '-y', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', f'{W}x{H}', '-r', str(FPS), '-i', '-',
                                '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p', '-c:v', 'libx264', '-preset', 'ultrafast', '-qp', '0',
                                '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv',
                                str(STAGE / f'{key}.mkv')], stdin=subprocess.PIPE)
        n, i = 864 * 480 * 3, 0
        while len(buf := dec.stdout.read(n)) == n:
            x = torch.from_numpy(np.frombuffer(buf, np.uint8).reshape(480, 864, 3).copy()).permute(2, 0, 1)[None].cuda().half() / 255
            with torch.no_grad():
                y = model(x).clamp(0, 1)
                y = 0.8 * y + 0.2 * F.interpolate(x.float(), scale_factor=2, mode='bicubic', align_corners=False).clamp(0, 1).half()
            fr = (y[0].permute(1, 2, 0).float().cpu().numpy() * 255).round().astype(np.uint8)
            enc.stdin.write(fr.tobytes())
            if i == 6 * FPS:
                Image.fromarray(fr).save(poster, 'WEBP', quality=86, method=6)
            i += 1
        dec.wait(); enc.stdin.close(); enc.wait()
        assert i == DUR * FPS and enc.returncode == 0, (key, i, enc.returncode)
        print(f'{key}: {i} SR frames, poster {poster.stat().st_size / 1e3:.0f} kB', flush=True)
        encode(key)

def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument('--gpus', default='0,1,2,3,4,5'); ap.add_argument('--only', nargs='+', choices=[s[0] for s in SPECS])
    ap.add_argument('--encode-only', action='store_true', help='re-encode the web previews from existing intermediates')
    a = ap.parse_args()
    if a.encode_only:
        from concurrent.futures import ThreadPoolExecutor
        with ThreadPoolExecutor(6) as pool: list(pool.map(encode, [s[0] for s in SPECS if not a.only or s[0] in a.only]))
        return
    q = Queue()
    for s in SPECS:
        if not a.only or s[0] in a.only: q.put(s)
    gpus = [int(g) for g in a.gpus.split(',')]
    for _ in gpus: q.put(None)
    procs = [Process(target=worker, args=(g, q)) for g in gpus]
    for p in procs: p.start()
    for p in procs: p.join()
    if any(p.exitcode for p in procs): sys.exit('an upscale worker failed')

if __name__ == '__main__':
    main()
