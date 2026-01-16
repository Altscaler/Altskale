const DEFAULTS = {
  "/ex": {
    output: "This is an example of the shortcuts Magic KB can do! Try it",
    note: "Try typing /ex then space in any text field."
  }
};

const LIB_DEFAULTS = {
  "/cto": { tags: ["AI"], note: "Ask as an expert CTO", output: "Act as an expert CTO. Ask me 5 questions to understand the context, then propose a clear plan and next steps." },
  "/pm": { tags: ["Product"], note: "Product manager mode", output: "Act as a senior product manager. Turn my idea into: problem, audience, key features, MVP, metrics, and a 2-week plan." },
  "/copy": { tags: ["Content"], note: "Landing page copy", output: "Write landing page copy: headline, subheadline, 3 benefit bullets, social proof line, and CTA. Keep it sharp." },
  "/cold": { tags: ["Sales"], note: "Cold outreach", output: "Write a short cold message. 1 line hook, 1 line relevance, 1 line CTA. No cringe." },
  "/followup": { tags: ["Sales"], note: "Follow-up message", output: "Write a follow-up that is polite, direct, and gives an easy yes/no." },
  "/summary": { tags: ["Content", "AI"], note: "Summarize content", output: "Summarize this in 5 bullets. Then give 3 key takeaways and 1 action." },
  "/meeting": { tags: ["Product", "Content"], note: "Meeting recap", output: "Write a meeting recap: context, decisions, action items with owners, and next meeting agenda." },
  "/ideas": { tags: ["Content"], note: "Content ideas", output: "Give me 10 strong content ideas. Each: hook, angle, and CTA. No filler." },
  "/rewrite": { tags: ["Content"], note: "Rewrite in a sharper tone", output: "Rewrite this to be clearer, shorter, and more punchy. Keep meaning. Remove fluff." },
  "/qa": { tags: ["AI"], note: "Question generator", output: "Ask me 10 high-signal questions to clarify what I want, then propose the best answer format." }
};

const $ = (id) => document.getElementById(id);

const els = {
  // views
  homeView: $("homeView"),
  libraryView: $("libraryView"),

  // header CTAs
  openOptions: $("openOptions"),
  openLibrary: $("openLibrary"),
  libraryBtn: $("libraryBtn"),

  // home
  list: $("list"),
  search: $("search"),
  addBtn: $("addBtn"),

  // library
  libGrid: $("libGrid"),
  libSearch: $("libSearch"),
  libBack: $("libBack"),
  libTags: $("libTags"),
  libSubfilters: $("libSubfilters"),

  // modal
  modalBackdrop: $("modalBackdrop"),
  modalTitle: $("modalTitle"),
  shortcutInput: $("shortcutInput"),
  noteInput: $("noteInput"),
  expansionInput: $("expansionInput"),
  cancelBtn: $("cancelBtn"),
  saveBtn: $("saveBtn"),
  deleteBtn: $("deleteBtn"),
  exportBtn: $("exportBtn"),
  importBtn: $("importBtn"),
  modalClose: $("modalClose")
};

let shortcuts = {};
let library = {};

// Library filters
let libTag = "All";
const libSub = new Set();

const LIB_TAGS = ["All", "AI", "LinkedIn", "Product", "Sales", "Content"];

const ICONS = {
  all: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 6h16"/><path d="M4 12h16"/><path d="M4 18h16"/></svg>`,
  spark: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l1.2 4.3L17.5 8l-4.3 1.2L12 13.5 10.8 9.2 6.5 8l4.3-1.7L12 2z"/><path d="M5 14l.8 2.8L8.5 18l-2.7.8L5 21l-.8-2.2L1.5 18l2.7-1.2L5 14z"/></svg>`,
  li: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="4"/><path d="M7 10v7"/><path d="M7 7h.01"/><path d="M11 10v7"/><path d="M11 13c0-2 1-3 3-3s3 1 3 3v4"/></svg>`,
  cube: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l8 4.5v11L12 22 4 17.5v-11L12 2z"/><path d="M12 22v-11"/><path d="M20 6.5l-8 4.5-8-4.5"/></svg>`,
  trend: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 17l6-6 4 4 7-7"/><path d="M14 8h6v6"/></svg>`,
  pen: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>`,
  bolt: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z"/></svg>`,
  file: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M8 13h8"/><path d="M8 17h8"/></svg>`
};

const LIB_SUBFILTERS = [
  { id: "in_kb", label: "In KB", icon: "check" },
  { id: "not_in_kb", label: "Not in KB", icon: "plus" },
  { id: "short", label: "Short", icon: "bolt" },
  { id: "long", label: "Long", icon: "file" }
];

let editingKey = null;
let editingSource = "shortcuts"; // "shortcuts" or "library"

// Tooltip for notes on home list
let tipEl = null;
let tipHideTimer = null;

function ensureTip() {
  if (tipEl) return tipEl;
  tipEl = document.createElement("div");
  tipEl.className = "mk-tooltip";
  document.documentElement.appendChild(tipEl);
  return tipEl;
}
function showTip(text, anchor) {
  if (!text) return;
  clearTimeout(tipHideTimer);
  const el = ensureTip();
  el.textContent = text;

  const r = anchor.getBoundingClientRect();
  let left = r.left + 10;
  let top = r.bottom + 8;

  el.classList.add("show");
  el.style.left = "0px";
  el.style.top = "0px";
  el.style.opacity = "0";

  requestAnimationFrame(() => {
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    left = Math.min(Math.max(8, left), window.innerWidth - w - 8);
    top = Math.min(Math.max(8, top), window.innerHeight - h - 8);
    el.style.left = left + "px";
    el.style.top = top + "px";
    el.style.opacity = "";
    el.classList.add("show");
  });
}
function hideTipSoon() {
  if (!tipEl) return;
  clearTimeout(tipHideTimer);
  tipHideTimer = setTimeout(() => tipEl.classList.remove("show"), 60);
}
function hideTipNow() {
  if (!tipEl) return;
  clearTimeout(tipHideTimer);
  tipEl.classList.remove("show");
}

function escapeHtml(str) {
  return String(str)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
function snippet(str, max = 90) {
  const s = String(str || "").replace(/\s+/g, " ").trim();
  return s.length > max ? s.slice(0, max) + "…" : s;
}

function normalizeValue(v) {
  if (typeof v === "string") return { output: v, note: "", tags: [] };
  if (v && typeof v === "object") {
    const tagsRaw = Array.isArray(v.tags) ? v.tags : [];
    return {
      output: String(v.output ?? ""),
      note: String(v.note ?? ""),
      tags: tagsRaw.map((t) => String(t))
    };
  }
  return { output: "", note: "", tags: [] };
}
function normalizeMap(obj) {
  const out = {};
  for (const [k, v] of Object.entries(obj || {})) {
    if (typeof k !== "string") continue;
    out[k] = normalizeValue(v);
  }
  return out;
}

function loadAll() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(
      { shortcuts: null, seeded: false, library: null, seededLibrary: false },
      (res) => resolve(res)
    );
  });
}
function saveShortcuts(next) {
  return new Promise((resolve) => chrome.storage.sync.set({ shortcuts: next }, resolve));
}
function saveLibrary(next) {
  return new Promise((resolve) => chrome.storage.sync.set({ library: next }, resolve));
}
function markSeeded() {
  return new Promise((resolve) => chrome.storage.sync.set({ seeded: true }, resolve));
}
function markLibrarySeeded() {
  return new Promise((resolve) => chrome.storage.sync.set({ seededLibrary: true }, resolve));
}

function keysSorted(obj) {
  return Object.keys(obj).sort((a, b) => a.localeCompare(b));
}

function showHome() {
  els.homeView.style.display = "block";
  if (els.libraryView) els.libraryView.style.display = "none";
  hideTipNow();
}
function showLibrary() {
  els.homeView.style.display = "none";
  if (els.libraryView) els.libraryView.style.display = "block";
  hideTipNow();
  buildLibraryFilters();
  renderLibrary();
}

function buildLibraryFilters() {
  if (!els.libTags || !els.libSubfilters) return;

  // Tag chips (top row)
  els.libTags.innerHTML = "";
  LIB_TAGS.forEach((tag) => {
    const b = document.createElement("button");
    b.className = "chip" + (libTag === tag ? " active" : "");

    const icon =
      tag === "All" ? ICONS.all :
      tag === "AI" ? ICONS.spark :
      tag === "LinkedIn" ? ICONS.li :
      tag === "Product" ? ICONS.cube :
      tag === "Sales" ? ICONS.trend :
      tag === "Content" ? ICONS.pen : "";

    b.innerHTML = icon ? `${icon}<span>${escapeHtml(tag)}</span>` : `<span>${escapeHtml(tag)}</span>`;
    b.addEventListener("click", () => {
      libTag = tag;
      buildLibraryFilters();
      renderLibrary();
    });
    els.libTags.appendChild(b);
  });

  // Icon subfilters (second row)
  els.libSubfilters.innerHTML = "";
  LIB_SUBFILTERS.forEach((f) => {
    const b = document.createElement("button");
    const active = libSub.has(f.id);
    b.className = "fchip" + (active ? " active" : "");
    b.innerHTML = `${ICONS[f.icon] || ""}<span>${escapeHtml(f.label)}</span>`;
    b.addEventListener("click", () => {
      const willEnable = !libSub.has(f.id);

      // mutual exclusivity
      if (f.id === "in_kb" && willEnable) libSub.delete("not_in_kb");
      if (f.id === "not_in_kb" && willEnable) libSub.delete("in_kb");
      if (f.id === "short" && willEnable) libSub.delete("long");
      if (f.id === "long" && willEnable) libSub.delete("short");

      if (willEnable) libSub.add(f.id);
      else libSub.delete(f.id);

      buildLibraryFilters();
      renderLibrary();
    });
    els.libSubfilters.appendChild(b);
  });
}

function renderHome() {
  const q = (els.search?.value || "").trim().toLowerCase();
  const ks = keysSorted(shortcuts).filter((k) => {
    if (!q) return true;
    const v = shortcuts[k] || { output: "", note: "" };
    return k.toLowerCase().includes(q) || String(v.output).toLowerCase().includes(q) || String(v.note).toLowerCase().includes(q);
  });

  els.list.innerHTML = "";
  if (ks.length === 0) {
    const div = document.createElement("div");
    div.className = "empty";
    div.textContent = q ? "No match." : "No shortcuts yet. Click + to add one.";
    els.list.appendChild(div);
    return;
  }

  ks.forEach((k) => {
    const v = shortcuts[k] || { output: "", note: "" };
    const div = document.createElement("div");
    div.className = "item";
    div.innerHTML = `
      <div class="k">${escapeHtml(k)}</div>
      <div class="v">${escapeHtml(snippet(v.output))}</div>
    `;

    div.addEventListener("click", () => openModal("edit", k, "shortcuts"));

    const note = (v.note || "").trim();
    if (note) {
      div.addEventListener("mouseenter", () => showTip(note, div));
      div.addEventListener("mouseleave", hideTipSoon);
    }

    els.list.appendChild(div);
  });
}

function renderLibrary() {
  if (!els.libGrid) return;
  const q = (els.libSearch?.value || "").trim().toLowerCase();
  const wantTag = libTag;
  const wantInKb = libSub.has("in_kb");
  const wantNotInKb = libSub.has("not_in_kb");
  const wantShort = libSub.has("short");
  const wantLong = libSub.has("long");

  const ks = keysSorted(library).filter((k) => {
    const v = library[k] || { output: "", note: "", tags: [] };

    if (q) {
      const okQ =
        k.toLowerCase().includes(q) ||
        String(v.output).toLowerCase().includes(q) ||
        String(v.note).toLowerCase().includes(q);
      if (!okQ) return false;
    }

    if (wantTag && wantTag !== "All") {
      const tags = Array.isArray(v.tags) ? v.tags : [];
      if (!tags.includes(wantTag)) return false;
    }

    if (wantInKb && !shortcuts[k]) return false;
    if (wantNotInKb && shortcuts[k]) return false;

    const len = String(v.output || "").trim().length;
    if (wantShort && len > 200) return false;
    if (wantLong && len <= 200) return false;

    return true;
  });

  els.libGrid.innerHTML = "";
  if (ks.length === 0) {
    const div = document.createElement("div");
    div.className = "empty";
    div.textContent = q ? "No match." : "No prompts yet.";
    els.libGrid.appendChild(div);
    return;
  }

  ks.forEach((k) => {
    const v = library[k] || { output: "", note: "", tags: [] };
    const card = document.createElement("div");
    card.className = "pitem";
    const title = (v.note || "").trim() ? v.note.trim() : k;
    card.innerHTML = `
      <div class="ptitle">${escapeHtml(title)}</div>
      <div class="pnote">${escapeHtml(snippet(v.output, 120))}</div>
    `;
    card.addEventListener("click", () => openModal("edit", k, "library"));
    els.libGrid.appendChild(card);
  });
}

function openModal(mode, key = null, source = "shortcuts") {
  editingKey = mode === "edit" ? key : null;
  editingSource = source;

  const titleBase = source === "library" ? "Prompt" : "Shortcut";
  els.modalTitle.textContent = mode === "edit" ? `Edit ${titleBase.toLowerCase()}` : `Add ${titleBase.toLowerCase()}`;
  els.deleteBtn.style.display = mode === "edit" ? "inline-block" : "none";

  const map = source === "library" ? library : shortcuts;

  if (mode === "edit") {
    const v = map[key] || { output: "", note: "" };
    els.shortcutInput.value = key;
    els.shortcutInput.disabled = false; // allow rename
    els.noteInput.value = v.note || "";
    els.expansionInput.value = v.output || "";
  } else {
    els.shortcutInput.value = "";
    els.shortcutInput.disabled = false;
    els.noteInput.value = "";
    els.expansionInput.value = "";
  }

  els.modalBackdrop.style.display = "flex";
  setTimeout(() => (mode === "edit" ? els.expansionInput.focus() : els.shortcutInput.focus()), 0);
}

function closeModal() {
  els.modalBackdrop.style.display = "none";
  editingKey = null;
  editingSource = "shortcuts";
  els.shortcutInput.disabled = false;
  hideTipNow();
}

async function upsertShortcut() {
  const key = els.shortcutInput.value.trim();
  if (!key) return;

  const payload = { output: els.expansionInput.value, note: els.noteInput.value };

  // Update the source map (shortcuts or library)
  if (editingSource === "library") {
    const prev = editingKey ? (library[editingKey] || library[key]) : library[key];
    payload.tags = Array.isArray(prev?.tags) ? [...prev.tags] : [];
    const nextLib = { ...library };
    if (editingKey && editingKey !== key) delete nextLib[editingKey];
    nextLib[key] = payload;
    library = nextLib;
    await saveLibrary(nextLib);

    // Make it usable immediately: also add/update in shortcuts
    const next = { ...shortcuts, [key]: payload };
    shortcuts = next;
    await saveShortcuts(next);
    renderHome();
    renderLibrary();
    closeModal();
    return;
  }

  // Normal shortcut save (supports rename)
  const next = { ...shortcuts };
  if (editingKey && editingKey !== key) delete next[editingKey];
  next[key] = payload;

  shortcuts = next;
  await saveShortcuts(next);
  renderHome();
  closeModal();
}

async function deleteShortcut() {
  if (!editingKey) return;

  if (editingSource === "library") {
    const nextLib = { ...library };
    delete nextLib[editingKey];
    library = nextLib;
    await saveLibrary(nextLib);
    renderLibrary();
    closeModal();
    return;
  }

  const next = { ...shortcuts };
  delete next[editingKey];
  shortcuts = next;
  await saveShortcuts(next);
  renderHome();
  closeModal();
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

async function exportShortcuts() {
  downloadJson("magic-kb-shortcuts.json", shortcuts);
}

async function importShortcuts() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/json";
  input.onchange = async () => {
    const file = input.files?.[0];
    if (!file) return;
    try {
      const parsed = JSON.parse(await file.text());
      const cleaned = normalizeMap(parsed);
      shortcuts = cleaned;
      await saveShortcuts(cleaned);
      await markSeeded();
      renderHome();
    } catch {}
  };
  input.click();
}

async function init() {
  const loaded = await loadAll();

  const rawShort = loaded.shortcuts && typeof loaded.shortcuts === "object" ? loaded.shortcuts : {};
  const normalizedShort = normalizeMap(rawShort);

  if (!loaded.seeded && Object.keys(normalizedShort).length === 0) {
    shortcuts = { ...DEFAULTS };
    await saveShortcuts(shortcuts);
    await markSeeded();
  } else {
    shortcuts = normalizedShort;
    const hadString = Object.values(rawShort).some((v) => typeof v === "string");
    if (hadString) await saveShortcuts(shortcuts);
    if (!loaded.seeded) await markSeeded();
  }

  const rawLib = loaded.library && typeof loaded.library === "object" ? loaded.library : {};
  const normalizedLib = normalizeMap(rawLib);
  if (!loaded.seededLibrary && Object.keys(normalizedLib).length === 0) {
    library = { ...LIB_DEFAULTS };
    await saveLibrary(library);
    await markLibrarySeeded();
  } else {
    library = normalizedLib;
    const hadString = Object.values(rawLib).some((v) => typeof v === "string");
    if (hadString) await saveLibrary(library);
    if (!loaded.seededLibrary) await markLibrarySeeded();
  }

  renderHome();

  els.search?.addEventListener("input", renderHome);
  els.addBtn?.addEventListener("click", () => openModal("add", null, "shortcuts"));

  els.cancelBtn?.addEventListener("click", closeModal);
  els.modalClose?.addEventListener("click", closeModal);
  els.modalBackdrop?.addEventListener("click", (e) => {
    if (e.target === els.modalBackdrop) closeModal();
  });

  els.saveBtn?.addEventListener("click", upsertShortcut);
  els.deleteBtn?.addEventListener("click", deleteShortcut);

  // CTA bindings
  els.openOptions?.addEventListener("click", (e) => {
    e.preventDefault();
    chrome.runtime.openOptionsPage?.();
  });

  const openLibrary = els.openLibrary || els.libraryBtn;
  openLibrary?.addEventListener("click", (e) => {
    e.preventDefault();
    showLibrary();
  });

  els.libBack?.addEventListener("click", (e) => {
    e.preventDefault();
    showHome();
  });

  els.libSearch?.addEventListener("input", renderLibrary);

  els.exportBtn?.addEventListener("click", exportShortcuts);
  els.importBtn?.addEventListener("click", importShortcuts);

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area !== "sync") return;

    if (changes.shortcuts) {
      shortcuts = normalizeMap(changes.shortcuts.newValue || {});
      renderHome();
    }
    if (changes.library) {
      library = normalizeMap(changes.library.newValue || {});
      renderLibrary();
    }
  });

  window.addEventListener("scroll", hideTipNow, true);
  window.addEventListener("blur", hideTipNow);
}

init();
