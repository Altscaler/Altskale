// Magic KB content script (V17)
const DEFAULTS = { "/ex": { output: "This is an example of the shortcuts Magic KB can do! Try it", note: "" } };

let shortcutsCache = null;
let isApplying = false;

function normalizeValue(v) {
  if (typeof v === "string") return { output: v, note: "" };
  if (v && typeof v === "object") return { output: String(v.output ?? ""), note: String(v.note ?? "") };
  return { output: "", note: "" };
}
function normalizeMap(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj || {})) {
    if (typeof k !== "string") continue;
    out[k] = normalizeValue(v);
  }
  return out;
}

function loadShortcuts() {
  return new Promise((resolve) => {
    chrome.storage.sync.get({ shortcuts: null, seeded: false }, (res) => {
      const raw = res.shortcuts && typeof res.shortcuts === "object" ? res.shortcuts : {};
      let shortcuts = normalizeMap(raw);

      if (!res.seeded && Object.keys(shortcuts).length === 0) {
        shortcuts = { ...DEFAULTS };
        chrome.storage.sync.set({ shortcuts, seeded: true });
      } else if (!res.seeded) {
        chrome.storage.sync.set({ seeded: true });
      }

      const hadString = Object.values(raw).some((v) => typeof v === "string");
      if (hadString) chrome.storage.sync.set({ shortcuts });

      shortcutsCache = shortcuts;
      resolve(shortcutsCache);
    });
  });
}

chrome.storage.onChanged.addListener((changes, area) => {
  if (area !== "sync") return;
  if (changes.shortcuts) shortcutsCache = normalizeMap(changes.shortcuts.newValue || {});
});

function isEditable(el) {
  if (!el) return false;
  const tag = (el.tagName || "").toLowerCase();
  if (tag === "textarea") return true;
  if (tag === "input") {
    const t = (el.getAttribute("type") || "text").toLowerCase();
    return ["text", "search", "email", "url", "tel", "password"].includes(t);
  }
  if (el.isContentEditable) return true;
  return false;
}

function getTokenBeforeCursor(text, cursorIndex) {
  const left = text.slice(0, cursorIndex);
  const m = left.match(/(\S+)$/);
  return m ? m[1] : "";
}

function setNativeValue(el, value) {
  const tag = (el.tagName || "").toLowerCase();
  const proto = tag === "textarea" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
  const desc = Object.getOwnPropertyDescriptor(proto, "value");
  const setter = desc && desc.set;
  if (setter) setter.call(el, value);
  else el.value = value;
}

function replaceTokenInInput(el, token, expansion, delimiterChar) {
  const cursor = el.selectionStart;
  if (cursor == null) return false;
  const start = cursor - token.length;
  if (start < 0) return false;

  const value = el.value;
  const next = value.slice(0, start) + expansion + delimiterChar + value.slice(cursor);
  setNativeValue(el, next);

  const newCursor = start + expansion.length + delimiterChar.length;
  el.selectionStart = el.selectionEnd = newCursor;
  el.dispatchEvent(new Event("input", { bubbles: true }));
  return true;
}

function getCollapsedRange() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0);
  if (!range.collapsed) return null;
  return range;
}

function getTextNodeAndOffset(range) {
  let node = range.startContainer;
  let offset = range.startOffset;

  if (node.nodeType === Node.TEXT_NODE) return { node, offset, text: node.nodeValue || "" };

  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT, null);
  let lastText = null;
  while (walker.nextNode()) lastText = walker.currentNode;
  if (!lastText) return null;

  return { node: lastText, offset: (lastText.nodeValue || "").length, text: lastText.nodeValue || "" };
}

function replaceTokenInContentEditable(activeEl, info, token, expansion, delimiterChar) {
  const start = info.offset - token.length;
  const end = info.offset;
  if (start < 0) return false;

  const r = document.createRange();
  r.setStart(info.node, start);
  r.setEnd(info.node, end);

  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(r);

  const text = expansion + delimiterChar;
  const ok = document.execCommand && document.execCommand("insertText", false, text);
  if (!ok) {
    r.deleteContents();
    r.insertNode(document.createTextNode(text));
    r.collapse(false);
    sel.removeAllRanges();
    sel.addRange(r);
  }

  (activeEl || document.activeElement)?.dispatchEvent(new Event("input", { bubbles: true }));
  return true;
}

function showPop(anchorEl) {
  try {
    const rect = (anchorEl || document.body).getBoundingClientRect();
    const pop = document.createElement("div");
    pop.textContent = "Magic KB";
    pop.style.position = "fixed";
    pop.style.left = Math.min(Math.max(8, rect.left + 10), window.innerWidth - 90) + "px";
    pop.style.top = Math.min(Math.max(8, rect.top - 32), window.innerHeight - 40) + "px";
    pop.style.padding = "6px 10px";
    pop.style.borderRadius = "999px";
    pop.style.font = "600 12px system-ui, -apple-system, Segoe UI, Roboto, Arial";
    pop.style.background = "#ff8a1f";
    pop.style.color = "#111";
    pop.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
    pop.style.zIndex = "2147483647";
    pop.style.opacity = "0";
    pop.style.transform = "translateY(6px) scale(0.98)";
    pop.style.transition = "opacity 140ms ease, transform 140ms ease";
    document.documentElement.appendChild(pop);

    requestAnimationFrame(() => {
      pop.style.opacity = "1";
      pop.style.transform = "translateY(0px) scale(1)";
    });

    setTimeout(() => {
      pop.style.opacity = "0";
      pop.style.transform = "translateY(-4px) scale(0.98)";
      setTimeout(() => pop.remove(), 160);
    }, 420);
  } catch {}
}

async function tryExpandOnDelimiter(el, delimiterChar) {
  if (isApplying) return false;
  const shortcuts = shortcutsCache || (await loadShortcuts());
  if (!shortcuts || Object.keys(shortcuts).length === 0) return false;
  if (!isEditable(el)) return false;

  if (el.isContentEditable) {
    const range = getCollapsedRange();
    if (!range) return false;
    const info = getTextNodeAndOffset(range);
    if (!info) return false;

    const token = getTokenBeforeCursor(info.text, info.offset);
    if (!token) return false;

    const entry = shortcuts[token];
    const expansion = entry ? String(entry.output || "") : "";
    if (!expansion) return false;

    isApplying = true;
    const ok = replaceTokenInContentEditable(el, info, token, expansion, delimiterChar);
    if (ok) showPop(el);
    isApplying = false;
    return ok;
  } else {
    const cursor = el.selectionStart;
    if (cursor == null) return false;

    const token = getTokenBeforeCursor(el.value, cursor);
    if (!token) return false;

    const entry = shortcuts[token];
    const expansion = entry ? String(entry.output || "") : "";
    if (!expansion) return false;

    isApplying = true;
    const ok = replaceTokenInInput(el, token, expansion, delimiterChar);
    if (ok) showPop(el);
    isApplying = false;
    return ok;
  }
}

const DELIMS = new Map([[" ", " "], [";", ";"]]);

document.addEventListener("keydown", async (e) => {
  if (e.ctrlKey || e.metaKey || e.altKey) return;
  const delimiterChar = DELIMS.get(e.key);
  if (!delimiterChar) return;

  const el = e.target;
  if (!isEditable(el)) return;

  const did = await tryExpandOnDelimiter(el, delimiterChar);
  if (did) {
    e.preventDefault();
    e.stopPropagation();
  }
}, true);

loadShortcuts();
