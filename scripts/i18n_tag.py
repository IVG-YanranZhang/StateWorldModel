"""Mark the translatable text blocks of index.html and keep the Chinese dictionary in sync.

python3 scripts/i18n_tag.py            # tag new blocks, refresh static/data/i18n-zh.js (keeps existing zh)
python3 scripts/i18n_tag.py --check    # exit 1 if a block is untagged, untranslated or stale

A block is the outermost element whose content is text plus inline markup only (no block-level
descendants, no descendants with an id, nothing inside <script>/<style>/<svg>/<pre>/<code>).
Each block gets `data-i18n="kNNN"`; the dictionary stores its English source and text next to the
Chinese markup, so the runtime (static/js/i18n.js) can skip a block whose English has since changed.
Elements marked `data-i18n-skip` (e.g. the language switch) are left alone.
Only attributes are inserted, so the rest of index.html keeps its formatting.
"""
import argparse, json, re, sys
from html import unescape
from html.parser import HTMLParser
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PAGE = ROOT / 'index.html'
DICT = ROOT / 'static/data/i18n-zh.js'
HEADER = 'window.SWM_I18N_ZH = '
INLINE = {'a', 'abbr', 'b', 'br', 'code', 'em', 'i', 'img', 'kbd', 'mark', 'small', 'span', 'strong', 'sub', 'sup', 'time', 'wbr', 'u', 's'}
VOID = {'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr'}
OPAQUE = {'script', 'style', 'svg', 'pre', 'code', 'template', 'noscript'}
CANDIDATE = {'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'li', 'figcaption', 'th', 'td', 'dt', 'dd', 'summary', 'label',
             'button', 'a', 'span', 'small', 'strong', 'em', 'div', 'caption', 'legend', 'blockquote'}


class Node:
    def __init__(self, tag, attrs, start, start_end, parent):
        self.tag, self.attrs, self.start, self.start_end, self.parent = tag, dict(attrs), start, start_end, parent
        self.end = None          # offset of '</tag'
        self.children, self.text = [], ''


class Tree(HTMLParser):
    def __init__(self, src):
        super().__init__(convert_charrefs=False)
        self.src = src
        self.line_starts = [0] + [m.end() for m in re.finditer('\n', src)]
        self.root = Node('#root', [], 0, 0, None); self.stack = [self.root]

    def abs_pos(self):
        line, col = self.getpos(); return self.line_starts[line - 1] + col

    def handle_starttag(self, tag, attrs):
        start = self.abs_pos(); node = Node(tag, attrs, start, start + len(self.get_starttag_text()), self.stack[-1])
        self.stack[-1].children.append(node)
        if tag not in VOID: self.stack.append(node)
        else: node.end = node.start_end

    def handle_startendtag(self, tag, attrs):
        start = self.abs_pos(); node = Node(tag, attrs, start, start + len(self.get_starttag_text()), self.stack[-1])
        node.end = node.start_end; self.stack[-1].children.append(node)

    def handle_endtag(self, tag):
        for i in range(len(self.stack) - 1, 0, -1):
            if self.stack[i].tag == tag:
                self.stack[i].end = self.abs_pos(); del self.stack[i:]; return

    def handle_data(self, data): self.stack[-1].text += data
    def handle_entityref(self, name): self.stack[-1].text += f'&{name};'
    def handle_charref(self, name): self.stack[-1].text += f'&#{name};'


def has_letters(node):
    if re.search(r'[A-Za-z]{2,}', node.text): return True
    return any(has_letters(c) for c in node.children if c.tag not in OPAQUE)

def inline_only(node):
    for c in node.children:
        if c.tag not in INLINE or 'id' in c.attrs or not inline_only(c): return False
    return True

def blocks(node, out, opaque=False):
    for c in node.children:
        if opaque or c.tag in OPAQUE or 'data-i18n-skip' in c.attrs: continue
        if c.tag in CANDIDATE and c.end is not None and inline_only(c) and has_letters(c):
            out.append(c)
        else:
            blocks(c, out)
    return out

def norm(html): return re.sub(r'\s+', ' ', html).strip()
def text_of(html): return norm(unescape(re.sub(r'<[^>]+>', '', html)))

def load_dict():
    if not DICT.exists(): return {}
    return json.loads(DICT.read_text()[len(HEADER):].rstrip().rstrip(';'))

def main():
    ap = argparse.ArgumentParser(description=__doc__); ap.add_argument('--check', action='store_true'); a = ap.parse_args()
    src = PAGE.read_text(); tree = Tree(src); tree.feed(src)
    found = blocks(tree.root, [])
    entries = load_dict(); used = {int(k[1:]) for k in entries if k.startswith('k')}
    nxt = max(used, default=0) + 1; inserts, problems, keys = [], [], []
    for n in found:
        key = n.attrs.get('data-i18n')
        if key is None:
            if a.check: problems.append(f'untagged: <{n.tag}> {norm(src[n.start_end:n.end])[:60]}'); continue
            key = f'k{nxt:03d}'; nxt += 1; inserts.append((n.start + 1 + len(n.tag), f' data-i18n="{key}"'))
        en = norm(src[n.start_end:n.end]); keys.append(key)
        e = entries.setdefault(key, {'en': en, 'zh': ''})
        e['text'] = text_of(en)                      # what the runtime compares (browser re-serializes markup)
        if e['en'] != en:
            problems.append(f'stale {key}: English changed'); e['en'] = en
            if not a.check: e['zh'] = e.get('zh', '')
        if not e.get('zh'): problems.append(f'untranslated {key}: {en[:60]}')
    if a.check:
        for p in problems: print(p)
        print(f'{len(keys)} blocks, {len(problems)} problems'); sys.exit(1 if problems else 0)
    for pos, text in sorted(inserts, reverse=True): src = src[:pos] + text + src[pos:]
    PAGE.write_text(src)
    entries = {k: entries[k] for k in sorted(entries, key=lambda k: (k[0] != 'k', k)) if k in keys or not k.startswith('k')}
    DICT.write_text(HEADER + json.dumps(entries, ensure_ascii=False, indent=1) + ';\n')
    print(f'{len(keys)} blocks ({len(inserts)} newly tagged); {sum(1 for p in problems if p.startswith("untranslated"))} untranslated')

if __name__ == '__main__':
    main()
