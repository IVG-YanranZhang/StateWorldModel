"""Render the native HTML/CSS sharing cover with self-hosted assets."""
import base64
from pathlib import Path
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]

def main():
    html = (ROOT / 'scripts/social-card.html').read_text()
    assets = {
        '{{FONT_URL}}': ('font/woff2', ROOT / 'static/fonts/Manrope.woff2'),
        '{{SCENE_IMAGE}}': ('image/webp', ROOT / 'static/images/concepts/state-world-layers-1536.webp'),
    }
    for placeholder, (mime, path) in assets.items():
        html = html.replace(placeholder, f'data:{mime};base64,' + base64.b64encode(path.read_bytes()).decode())
    with sync_playwright() as playwright:
        browser = playwright.chromium.launch(headless=True)
        page = browser.new_page(viewport={'width': 1200, 'height': 630}, device_scale_factor=1)
        page.set_content(html, wait_until='load')
        page.evaluate('document.fonts.ready')
        page.wait_for_function('document.querySelector(".scene").complete && document.querySelector(".scene").naturalWidth > 0')
        page.screenshot(path=str(ROOT / 'static/images/social-card.jpg'), type='jpeg', quality=90)
        browser.close()
    print('Prepared anonymous 1200 × 630 sharing cover with original conceptual artwork.')

if __name__ == '__main__':
    main()
