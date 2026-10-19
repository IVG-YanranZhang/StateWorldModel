"use strict";
// Page language: ?lang=en|zh, else the reader's last choice, else English.
// Chinese is applied to the static markup before project.js runs (both scripts are deferred, in
// order); project.js builds its runtime strings through window.SWM_T. Blocks are tagged by
// scripts/i18n_tag.py; a block whose English text no longer matches the dictionary stays English.
(() => {
  const STORE = "swm-lang";
  const LANGS = ["en", "zh"];
  const query = new URLSearchParams(location.search).get("lang");
  let saved = null;
  try {
    saved = localStorage.getItem(STORE);
  } catch {}
  const lang = LANGS.includes(query) ? query : LANGS.includes(saved) ? saved : "en";
  if (LANGS.includes(query))
    try {
      localStorage.setItem(STORE, query);
    } catch {}
  const zh = lang === "zh";
  const blocks = window.SWM_I18N_ZH || {};
  const strings = window.SWM_I18N_ZH_STRINGS || {};
  const squash = (text) => text.replace(/\s+/g, " ").trim();

  window.SWM_LANG = lang;
  window.SWM_T = (en, vars) => {
    let text = (zh && strings[en]) || en;
    if (vars) text = text.replace(/\{(\w+)\}/g, (all, key) => (key in vars ? vars[key] : all));
    return text;
  };

  if (zh) {
    document.documentElement.lang = "zh-CN";
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const entry = blocks[el.dataset.i18n];
      if (!entry?.zh) return;
      if (squash(el.textContent) !== entry.text) {
        console.warn(`i18n: ${el.dataset.i18n} changed in English; run scripts/i18n_tag.py`);
        return;
      }
      el.innerHTML = entry.zh;
    });
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: (node) =>
        node.parentElement.closest("script, style, code, pre, [data-i18n-skip]")
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT,
    });
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const key = squash(node.nodeValue);
      if (key && strings[key])
        node.nodeValue =
          node.nodeValue.match(/^\s*/)[0] + strings[key] + node.nodeValue.match(/\s*$/)[0];
    }
    for (const attr of ["aria-label", "alt", "title", "placeholder"])
      document.querySelectorAll(`[${attr}]`).forEach((el) => {
        const value = strings[squash(el.getAttribute(attr))];
        if (value) el.setAttribute(attr, value);
      });
    document.title = strings[document.title] || document.title;
    const description = document.querySelector('meta[name="description"]');
    if (description && strings[description.content])
      description.content = strings[description.content];
  }

  document.querySelectorAll("[data-lang]").forEach((link) => {
    link.setAttribute("aria-current", String(link.dataset.lang === lang));
    link.addEventListener("click", (event) => {
      event.preventDefault();
      if (link.dataset.lang === lang) return;
      try {
        localStorage.setItem(STORE, link.dataset.lang);
      } catch {}
      const url = new URL(location.href);
      url.searchParams.set("lang", link.dataset.lang);
      location.assign(url);
    });
  });
})();
