# State World Model 项目网站 · 交接文档

> 2026-10-15 最新用户要求：公开八位作者及其个人主页 / GitHub / Scholar 链接，合并清华单位；不再显示 Anonymous submission。下方原始快照中的匿名网页约束已经被用户明确覆盖。More Works 移至右上角原生下拉菜单，顶部设 arXiv、Code、Benchmark 和 Demo 图标按钮；前三项正式地址尚未提供，按用户要求留空。Chan Yan Ki 使用 https://github.com/yankeee-0411 。原始论文 PDF 保留不变。

> 2026-10-13 更新：新版已提交并上线（首个完整发布提交 `e671bbd`）。当前页面为独立 HTML/CSS/JS，接入十组精选样例与 460 段真实录制，完整基准规模仍为 50 对 / 21 主题 / 49 隐藏变量。用户随后授权继续迭代十小时。最新结构、事实校正、媒体来源和验证命令见 [REDESIGN.md](REDESIGN.md)。以下保留原始交接快照；其中旧版行数、占位链接、Figure 6 裁剪与 Asra 拼写均已过时，不能作为当前论文事实来源。

> 面向接手"网站重设计"的 agent。以下全部为客观事实与可复现命令,不含设计意见。
> 更新时间:2026-10-09。当前版本 HEAD = `a3e4d24`(本地 master,已推送至 GitHub)。

---

## 1. 路径与在线地址

| 项 | 路径 / 地址 |
|---|---|
| 原始论文(线索唯一来源) | `/data/chenrenqi/paper/1610.pdf`(36 页,ICLR 2027 在审,双盲) |
| 论文纯文本(已提取) | `/tmp/paper.txt`(118KB;若被清理:`pdftotext /data/chenrenqi/paper/1610.pdf -` 可重取) |
| 网站仓库(本地) | `/data/chenrenqi/code/StateWorldModel`(clone 自 `https://github.com/IVG-YanranZhang/StateWorldModel.git`,branch=master) |
| 网站入口文件 | `<repo>/index.html`(当前 842 行,含内联 `<style>` 页面样式) |
| 线上地址 | `https://ivg-yanranzhang.github.io/StateWorldModel/`(GitHub Pages,已启用:master 分支 / root;HTTP 200 已验证) |
| 参考设计(仅样式参考) | `https://aigeeksgroup.github.io/Code2Games/` |
| 本仓库原有页面(重设计前的两代) | git 历史内(UniGenDet 项目页);另有 `unigendet_page_backup.html` 为重写前快照 |

## 2. 当前 index.html 章节结构(按页面顺序)

1. Hero:标题(红/蓝双色强调)+ "Anonymous Authors / ICLR 2027 under review" 徽标 + 三按钮(Paper 占位未链接 / Demos 锚点 / BibTeX 锚点)
2. Teaser:论文 Figure 1 裁剪图(`static/images/swm_teaser.png`)+ 图注
3. Abstract:论文摘要原文(数字:32% → 64% → 92%;50 twin pairs;21 themes;49 hidden variables;11 backends)
4. 数字带:5 个数据卡(92% PairFollow / 32→64 / 90% PairStrict / 50 pairs / 11 backends)
5. Contributions:3 卡片(诊断基准 / 显式状态运行时 / 受控对比)
6. How a Turn Works:四步闭环卡片 + 多回合对决图(`static/images/paper/swm_multiturn.png`,论文 Figure 6 裁剪)
7. Three Worlds 游戏画廊:3 卡片(见 §3)
8. WorldState-Bench 结果表:HTML 表格,数据转写自论文 Table 1(11 后端 + Stateful Harness 高亮行,Track A/B 六列)
9. BibTeX:匿名占位引用
10. Footer

样式:页面专属内联 `<style>`(CSS 变量前缀 `--swm-*`;衬线标题 Noto Serif SC;贡献/闭环/画廊三套栅格);模板层为仓库自带 bulma.min.css + fontawesome.all.min.css(图标已全部替换为内联 SVG,无 webfonts 依赖)。

## 3. 游戏画廊资产清单(3 卡,全部经实渲染验证)

| 卡片 id | 视频(24s) | 首帧缩略图 | 原始 montage 来源 |
|---|---|---|---|
| `duel_moon_dragon` | `static/videos/duel_moon_dragon.mp4`(2.7MB)| `static/images/games/duel_moon_dragon.png` | `<agentic_game>/generated/duel_gallery/duel_moon_dragon_swordsman/game_montage.mp4` |
| `romance` | `static/videos/romance.mp4`(1.5MB)| `static/images/games/romance.png` | `<agentic_game>/generated/run-20261011-155207/game_montage.mp4` |
| `openworld` | `static/videos/openworld.mp4`(3.1MB)| `static/images/games/openworld.png` | `<agentic_game>/generated/run-20261011-155518/game_montage.mp4` |

(`<agentic_game>` = `/data/chenrenqi/code/release_workspace/agentic_game`;卡片文案在 index.html 内 `SWM_GAMES` 数组;视频为 harness 原始输出前 24 秒,854 宽 CRF 27 压缩,无音轨。)

## 4. 模板可用资产

- `static/css/`:bulma.min.css、bulma-carousel/slider(css+js)、fontawesome.all.min.css(**无 webfonts 字体文件,fa 图标会渲染为方块——当前页面已全部改用内联 SVG,新增图标请沿用内联 SVG 方式**)、index.css(上一代页面样式)
- `static/js/`:bulma-carousel/slider/fontaware 系列 js
- `static/pdfs/`:上一代论文的 pdf,与本论文无关
- `static/images/`:swm_teaser.png、paper/swm_multiturn.png、games/{duel_moon_dragon,romance,openworld}.png

## 5. 本地预览与截图方法(已验证可用)

```bash
cd /data/chenrenqi/code/StateWorldModel
python3 -m http.server 8899          # 站点本地预览
```

截图(playwright 在系统 python3 可用):

```python
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={"width": 1440, "height": 900})
    pg.goto("http://127.0.0.1:8899/", wait_until="networkidle")
    pg.wait_for_timeout(1500)
    pg.screenshot(path="shot.png", full_page=True)
    b.close()
```

## 6. 部署与推送(事实)

- GitHub Pages 已启用(master / root),上线地址 200 已验证。
- 本机 `/root/.gitconfig` 对 github.com 配置了**已失效的 socks 代理**(`socks5h://127.0.0.1:7891`,宿主为 `~/.ssh/config` 中的 `JiJia2 = 112.25.93.66:5063`)。两条已验证通路:
  - git 操作加前缀 `GIT_CONFIG_GLOBAL=/dev/null`(直连,时通时断);
  - 或先拉起 SSH 动态隧道 `ssh -D 7891 -fN -o BatchMode=yes JiJia2`(稳定)。
- push 认证使用用户提供的 fine-grained PAT(**token 值不写入任何仓库文件**,由用户在会话中提供;权限需 Contents: Read and write)。
- 线上 200 已验证的资源:首页、3 段视频、图片目录。

## 7. 论文中的客观事实(写进页面时不得改动)

- 标题:State World Models: Execute the Rules, Generate the Pixels
- 框架名:Stateful Harness;基准名:WorldState-Bench(50 counterfactual twin pairs,21 themes,49 hidden variables)
- 关键数字:11 个未封装后端最佳 PairFollow = 32%(Rule-only);MiniMax-H3 Rule-only 32% → 供给 ending 64%;完整 harness **92% PairFollow / 90% PairStrict**(同一冻结 MiniMax-H3 权重)
- 指标定义:PairFollow = 双 clip 均呈现规定结局;PairStrict = 另需禁止结局在双 clip 均不出现;TwinContrast = 双 clip 结局可区分
- 引用后端名单(Wan2.2-A14B / LongCat-Video 13.6B / Hunyuan-Video 1.5 / MiniMax-H3 / LingBot-World v2 / Echo-WM Flash / FantasyWorld / AlayaWorld / InSpatio-World / Asra / HY-WorldPlay)与其六列数值见 §2 第 8 节表格(已按论文 Table 1 转写)

## 8. 重设计边界(客观约束,非意见)

- 页面必须保持双盲合规:作者署名 Anonymous、无身份指向链接。
- `static/videos/`、`static/images/games/`、`static/images/paper/`、`static/images/swm_teaser.png` 为内容资产,路径可调整但需同步 index.html 引用。
- bulma/fontawesome 模板资产与本节章节语义建议保留;`unigendet_page_backup.html`、`static/pdfs/`、`static/images/fig*`、`tab*` 为上一代遗留,可在确认后清理。
- teaser/caption 与结果表中的数字为论文事实(见 §7),重设计时不得改动。
