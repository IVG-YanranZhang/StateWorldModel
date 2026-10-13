"""Generate recording posters from the final decoded frame."""
from pathlib import Path
import subprocess


def extract_final_frame(video: Path, poster: Path) -> None:
    temporary = poster.with_name(poster.stem + '.tmp.webp')
    try:
        subprocess.run([
            'ffmpeg', '-y', '-v', 'error', '-threads', '1',
            '-sseof', '-1', '-i', str(video), '-vf', 'reverse',
            '-frames:v', '1', '-threads', '1', '-c:v', 'libwebp',
            '-quality', '75', '-compression_level', '6', str(temporary)
        ], check=True)
        if not temporary.is_file() or temporary.stat().st_size == 0:
            raise ValueError(f'No final frame produced for {video.name}')
        temporary.replace(poster)
    finally:
        temporary.unlink(missing_ok=True)
