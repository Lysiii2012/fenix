/* =========================================================
   Бюро перекладів «Фенікс» — інтерактив
   ========================================================= */

/* ---------- НАЛАШТУВАННЯ ---------- */
const CONFIG = {
  // Обробник заявок (пересилає їх у Telegram-бота). Токен і chat_id — у файлі send.php
  endpoint: "send.php",
  // true  — демо-режим: заявка нікуди не надсилається, лише показується «Дякуємо»
  // false — робочий режим: заявки йдуть у Telegram.
  // ⚠️ Коли вставите токен бота в send.php — поставте тут false
  demo: true,
  maxFiles: 5,
  maxFileMb: 10,
  // Ціни калькулятора (грн). Ставка за сторінку — в атрибутах data-rate у index.html
  notaryPrice: 250,
  apostillePrice: 1200,
  pagesPerDay: 6,
};

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* =========================================================
   i18n
   ========================================================= */
const I18N = {
  en: {
    logoSub: "Translation Bureau",
    navHome: "Home", navServices: "Services", navPrices: "Prices", navLanguages: "Languages", navAbout: "About", navReviews: "Reviews", navContacts: "Contacts",
    ctaRequest: "Send a request",
    heroEyebrow: "Professional translation — without borders",
    heroTitle1: "Phoenix", heroTitle2: "Translation Bureau",
    heroText: "Quality translations for your success anywhere in the world. We combine professionalism, experience and modern technology so your words work for you.",
    heroOrder: "Order a translation", heroCalc: "Calculate the price",
    servicesEyebrow: "Our services", servicesTitle: "Translations of any complexity", servicesAll: "All services", servicesLess: "Show less",
    s1t: "Written translation", s1d: "Documents, contracts, texts, presentations",
    s2t: "Interpreting", s2d: "Meetings, conferences, events",
    s3t: "Localization", s3d: "Websites, apps, marketing materials",
    s4t: "Notarization", s4d: "Translations with notary certification",
    s5t: "Apostille", s5d: "Apostille for your documents",
    s6t: "Technical translation", s6d: "Manuals, drawings, specifications",
    s7t: "Medical translation", s7d: "Medical records, certificates, test results",
    s8t: "Legal translation", s8d: "Charters, powers of attorney, court papers",
    s9t: "Urgent translation", s9d: "Done within a few hours",
    s10t: "Editing", s10d: "Proofreading and review of translations",
    whyEyebrow: "Why choose us", whyTitle: "Reliability. Quality. Professionalism.",
    f1t: "Experienced translators", f1d: "Native speakers and qualified specialists only",
    f2t: "Deadlines met", f2d: "We value your time and reputation",
    f3t: "High quality", f3d: "Multi-level review of every translation",
    f4t: "Confidentiality", f4d: "Full security of your data guaranteed",
    f5t: "Individual approach", f5d: "We consider every wish and project detail",
    f6t: "Support 24/7", f6d: "Always in touch for your comfort",
    procEyebrow: "How we work", procTitle: "A simple and convenient process",
    p1t: "Request", p1d: "Leave a request on the site or message us",
    p2t: "Quote", p2d: "We quickly calculate price and timing",
    p3t: "Translation", p3d: "We work with your text or documents",
    p4t: "Review", p4d: "Editing and quality control",
    p5t: "Result", p5d: "Receive your translation the way you like",
    calcEyebrow: "Pricing", calcTitle: "Calculate the price online",
    calcLead: "Choose the options to see an estimated price and timing. A manager will confirm the exact amount for free.",
    cType: "Text type", cT1: "General / documents", cT2: "Legal", cT3: "Technical", cT4: "Medical", cT5: "Marketing / localization",
    cLang: "Target language", cPages: "Volume, pages",
    cHint: "1 page = 1800 characters with spaces or 1 standard document (passport, certificate)",
    cSpeed: "Urgency", cS1: "Standard", cS2: "Express ×1.5", cS3: "Within 24h ×2",
    cNotary: "Notarization", cNotaryP: "+250 UAH / document", cApostille: "Apostille", cApostilleP: "+1200 UAH",
    cTotal: "Estimated price", cFrom: "from", cUah: "UAH", cTerm: "Timing:", cPerPage: "Per page:",
    cOrder: "Order at this price", cNote: "This is a preliminary estimate. The final price will be confirmed after reviewing your documents.",
    day1: "day", day2: "days", day5: "days", hours24: "up to 24 hours",
    langEyebrow: "Languages", langTitle: "We work with all popular languages", langAll: "All languages", langLess: "Show less",
    lUk: "Ukrainian", lEn: "English", lDe: "German", lFr: "French", lEs: "Spanish", lIt: "Italian", lPl: "Polish", lZh: "Chinese",
    lJa: "Japanese", lTr: "Turkish", lSv: "Swedish", lNl: "Dutch", lEl: "Greek", lCs: "Czech", lAr: "Arabic", lPt: "Portuguese",
    lMore: "and more", lOther: "Other",
    revEyebrow: "Reviews", revTitle: "Trusted by clients",
    r1: "“Fast, high quality, professional! Very happy with the cooperation — I recommend it!”",
    r2: "“Documents were translated on time, clearly and without mistakes. Many thanks to the Phoenix team!”",
    r3: "“True professionals! I especially liked the communication and the speed.”",
    r4: "“Ordered an apostille and notarized diploma translation — all done in two days. Thank you!”",
    r5: "“They localized our website into three languages. Attentive to detail and kept us updated.”",
    clientF: "Client", clientM: "Client",
    faqEyebrow: "Questions & answers", faqTitle: "Frequently asked questions",
    faqLead: "Didn't find the answer? Write to us — we reply within 15 minutes.", faqAsk: "Ask a question",
    q1: "How much does a translation cost?",
    a1: "The price depends on the language, volume and subject. The base rate starts at 250 UAH per page (1800 characters). Use the calculator above or send us the document — we'll estimate it for free.",
    q2: "How fast will the translation be ready?",
    a2: "In standard mode we translate 5–8 pages per day. For urgent orders there is an express mode and a 24-hour translation.",
    q3: "Can I order a translation online?",
    a3: "Yes. Send a photo or scan of the document via the form, Telegram or email. You'll receive the translation by email or by Nova Poshta delivery.",
    q4: "Do you provide notarization?",
    a4: "Yes, we work with notaries and certify translations the same or the next day. The original or a notarized copy of the document is required.",
    q5: "What is needed for an apostille?",
    a5: "The original document and a copy of your passport. We'll tell you whether an apostille is required in your country and handle the whole submission.",
    q6: "Are my documents kept confidential?",
    a6: "Yes. All translators sign a non-disclosure agreement and files are stored only while the order is in progress. We can also sign an NDA with your company.",
    ctaTitle: "Ready to order a translation?", ctaText: "Contact us right now — and we'll find the best solution for you.",
    ctaOnline: "Online across Ukraine and worldwide",
    copyright: "Phoenix Translation Bureau. All rights reserved.",
    formTitle: "Send a request", formSub: "Fill in the form — we'll get back to you within 15 minutes.",
    fName: "Name *", fPhone: "Phone *", fContact: "How should we contact you?", fcCall: "Call",
    fService: "Service", fLang: "Language",
    fFile: "Files for a quote (optional)", fFileBtn: "Attach or drop documents", fFileHint: "PDF, DOC, JPG, PNG… up to 5 files, 10 MB each",
    fMsg: "Comment", fMsgPh: "E.g.: passport translation into Polish with notarization",
    fAgree: "I agree to the processing of personal data", fSubmit: "Send request", fSending: "Sending…",
    errName: "Please enter your name", errPhone: "Please enter a valid phone number", errEmail: "Please enter a valid email",
    errFileSize: "File “{name}” is larger than {mb} MB", errFileCount: "You can attach up to {n} files",
    errNet: "Couldn't send the request. Check your connection and try again, or call us: ",
    okTitle: "Thank you!", okText: "Your request has been received. Our manager will contact you shortly.", okClose: "Close",
    themeLight: "Switch to light theme", themeDark: "Switch to dark theme",
    calcSummary: "Estimate: {type}, {lang}, {pages} p., {speed} — from {price} UAH",
  },
};

// Українські тексти беремо прямо з HTML
I18N.uk = {};
$$("[data-i18n]").forEach(el => { I18N.uk[el.dataset.i18n] ??= el.textContent.trim(); });
$$("[data-i18n-ph]").forEach(el => { I18N.uk[el.dataset.i18nPh] = el.placeholder; });
Object.assign(I18N.uk, {
  servicesLess: "Згорнути", langLess: "Згорнути",
  fSending: "Надсилаємо…",
  day1: "день", day2: "дні", day5: "днів", hours24: "до 24 годин",
  errFileSize: "Файл «{name}» більший за {mb} МБ", errFileCount: "Можна прикріпити до {n} файлів",
  errNet: "Не вдалося надіслати заявку. Перевірте інтернет і спробуйте ще раз або зателефонуйте нам: ",
  themeLight: "Увімкнути світлу тему", themeDark: "Увімкнути темну тему",
  calcSummary: "Розрахунок: {type}, {lang}, {pages} стор., {speed} — від {price} грн",
});

let currentLang = "uk";
const t = (key, vars = {}) =>
  String(I18N[currentLang][key] ?? I18N.uk[key] ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? "");

function setLang(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$("[data-i18n-ph]").forEach(el => { el.placeholder = t(el.dataset.i18nPh); });
  $(".lang__current").textContent = lang === "uk" ? "UA" : lang.toUpperCase();
  $$(".lang__menu button").forEach(b => b.classList.toggle("is-current", b.dataset.lang === lang));
  syncToggleLabels();
  syncThemeLabel();
  updateCalc();
  if (!calcSummary.hidden) renderCalcSummary();
  try { localStorage.setItem("fenix-lang", lang); } catch (e) {}
}

/* ---------- Language dropdown ---------- */
const langBox = $("#lang");
const langBtn = $(".lang__btn", langBox);
function closeLang() { langBox.classList.remove("is-open"); langBtn.setAttribute("aria-expanded", "false"); }
langBtn.addEventListener("click", e => {
  e.stopPropagation();
  const open = langBox.classList.toggle("is-open");
  langBtn.setAttribute("aria-expanded", open);
});
$$(".lang__menu button").forEach(b => b.addEventListener("click", () => { setLang(b.dataset.lang); closeLang(); }));
document.addEventListener("click", e => { if (!langBox.contains(e.target)) closeLang(); });

/* =========================================================
   Тема
   ========================================================= */
const themeBtn = $("#themeToggle");
const metaTheme = $('meta[name="theme-color"]');
const isLight = () => document.documentElement.dataset.theme === "light";

function syncThemeLabel() {
  themeBtn.setAttribute("aria-label", t(isLight() ? "themeDark" : "themeLight"));
  metaTheme.setAttribute("content", isLight() ? "#fbf8f3" : "#050c1c");
}
function applyTheme(light) {
  if (light) document.documentElement.dataset.theme = "light";
  else delete document.documentElement.dataset.theme;
  syncThemeLabel();
  try { localStorage.setItem("fenix-theme", light ? "light" : "dark"); } catch (e) {}
}
themeBtn.addEventListener("click", () => {
  const next = !isLight();
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (document.startViewTransition && !reduce) document.startViewTransition(() => applyTheme(next));
  else applyTheme(next);
});

/* =========================================================
   Шапка: стан при скролі, активний пункт, «нагору»
   ========================================================= */
const header = $("#header");
const toTop = $("#toTop");
const navLinks = $$(".nav__link");
const sections = navLinks.map(l => $(l.getAttribute("href"))).filter(Boolean);

function onScroll() {
  const y = window.scrollY;
  header.classList.toggle("is-scrolled", y > 30);
  toTop.classList.toggle("is-visible", y > 600);

  const probe = y + window.innerHeight * 0.35;
  let current = sections[0];
  sections.forEach(s => { if (s.offsetTop <= probe) current = s; });
  if (window.innerHeight + y >= document.documentElement.scrollHeight - 4) current = sections[sections.length - 1];
  navLinks.forEach(l => l.classList.toggle("is-active", l.getAttribute("href") === "#" + current.id));
}
window.addEventListener("scroll", onScroll, { passive: true });
toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------- Мобільне меню ---------- */
const burger = $("#burger");
const nav = $("#nav");
const MENU_BP = 1100;
function toggleMenu(force) {
  const open = force ?? !nav.classList.contains("is-open");
  nav.classList.toggle("is-open", open);
  burger.classList.toggle("is-active", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Закрити меню" : "Відкрити меню");
  header.classList.toggle("menu-open", open);
  document.body.classList.toggle("no-scroll", open || modal.classList.contains("is-open"));
}
burger.addEventListener("click", () => toggleMenu());
navLinks.forEach(l => l.addEventListener("click", () => toggleMenu(false)));
window.addEventListener("resize", () => { if (window.innerWidth > MENU_BP) toggleMenu(false); });

/* ---------- «Всі послуги» / «Всі мови» ---------- */
const servicesSec = $("#services");
const langsSec = $("#languages");

function syncToggleLabels() {
  $("[data-toggle-services] span").textContent = t(servicesSec.classList.contains("show-all") ? "servicesLess" : "servicesAll");
  $(".section__head [data-toggle-langs] span").textContent = t(langsSec.classList.contains("show-all") ? "langLess" : "langAll");
}
$("[data-toggle-services]").addEventListener("click", e => {
  e.preventDefault();
  servicesSec.classList.toggle("show-all");
  $$(".card--extra").forEach(c => c.classList.add("is-visible"));
  syncToggleLabels();
});
$$("[data-toggle-langs]").forEach(b => b.addEventListener("click", () => {
  langsSec.classList.toggle("show-all");
  syncToggleLabels();
}));

/* ---------- Поява блоків при скролі ---------- */
const revealEls = $$(".reveal");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const siblings = [...el.parentElement.children].filter(c => c.classList.contains("reveal"));
      el.style.transitionDelay = Math.min(siblings.indexOf(el), 6) * 70 + "ms";
      el.classList.add("is-visible");
      io.unobserve(el);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
  revealEls.forEach(el => io.observe(el));
} else {
  revealEls.forEach(el => el.classList.add("is-visible"));
}

/* =========================================================
   Слайдер відгуків
   ========================================================= */
const track = $("#reviewsTrack");
const dotsBox = $("#reviewsDots");
const prevBtn = $('[data-slide="prev"]');
const nextBtn = $('[data-slide="next"]');
const slides = $$(".review", track);

function slideStep() {
  const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
  return slides[0].offsetWidth + gap;
}
function pageCount() {
  const visible = Math.max(1, Math.round((track.clientWidth + 1) / slideStep()));
  return slides.length - visible + 1;
}
function currentIndex() { return Math.round(track.scrollLeft / slideStep()); }
function buildDots() {
  const n = pageCount();
  dotsBox.innerHTML = "";
  if (n > 1) {
    for (let i = 0; i < n; i++) {
      const d = document.createElement("button");
      d.type = "button";
      d.setAttribute("aria-label", `${i + 1}`);
      d.addEventListener("click", () => goTo(i));
      dotsBox.appendChild(d);
    }
  }
  updateSlider();
}
function goTo(i) {
  const n = pageCount();
  track.scrollTo({ left: ((i + n) % n) * slideStep(), behavior: "smooth" });
}
function updateSlider() {
  const i = currentIndex();
  $$("button", dotsBox).forEach((d, k) => d.classList.toggle("is-active", k === i));
  prevBtn.disabled = track.scrollLeft <= 2;
  nextBtn.disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
}
prevBtn.addEventListener("click", () => goTo(currentIndex() - 1));
nextBtn.addEventListener("click", () => goTo(currentIndex() + 1));
track.addEventListener("scroll", () => requestAnimationFrame(updateSlider), { passive: true });
window.addEventListener("resize", buildDots);

let autoplay;
const stopAuto = () => clearInterval(autoplay);
const startAuto = () => {
  stopAuto();
  autoplay = setInterval(() => {
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
    goTo(atEnd ? 0 : currentIndex() + 1);
  }, 6000);
};
["mouseenter", "touchstart", "focusin"].forEach(ev => track.addEventListener(ev, stopAuto, { passive: true }));
["mouseleave", "touchend", "focusout"].forEach(ev => track.addEventListener(ev, startAuto, { passive: true }));

/* =========================================================
   Калькулятор
   ========================================================= */
const cType = $("#cType"), cLang = $("#cLang"), cPages = $("#cPages");
const cNotary = $("#cNotary"), cApostille = $("#cApostille");
const cPrice = $("#cPrice"), cDays = $("#cDays"), cRate = $("#cRate"), cPagesOut = $("#cPagesOut");
const fmt = n => Math.round(n).toLocaleString("uk-UA").replace(/ /g, " ");
let calcState = {};

function plural(n) {
  if (currentLang === "en") return n === 1 ? t("day1") : t("day2");
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return t("day1");
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return t("day2");
  return t("day5");
}

function updateCalc() {
  const pages = +cPages.value;
  const k = +cType.selectedOptions[0].dataset.k;
  const rate = +cLang.selectedOptions[0].dataset.rate;
  const speedInput = $('input[name="speed"]:checked');
  const speed = +speedInput.value;

  let total = pages * rate * k * speed;
  if (cNotary.checked) total += CONFIG.notaryPrice;
  if (cApostille.checked) total += CONFIG.apostillePrice;
  total = Math.ceil(total / 10) * 10;

  let daysText;
  if (speed === 2) daysText = t("hours24");
  else {
    const perDay = CONFIG.pagesPerDay * (speed === 1.5 ? 2 : 1);
    const d = Math.max(1, Math.ceil(pages / perDay));
    const extra = cNotary.checked || cApostille.checked ? 1 : 0;
    const from = d + extra, to = d + extra + 1;
    daysText = `${from}–${to} ${plural(to)}`;
  }

  const prev = cPrice.textContent;
  cPrice.textContent = fmt(total);
  if (prev !== cPrice.textContent) {
    cPrice.classList.add("bump");
    setTimeout(() => cPrice.classList.remove("bump"), 180);
  }
  cDays.textContent = daysText;
  cRate.textContent = `${fmt(rate * k)} ${t("cUah")}`;
  cPagesOut.textContent = pages;
  cPages.style.setProperty("--p", ((pages - cPages.min) / (cPages.max - cPages.min)) * 100 + "%");

  calcState = {
    type: cType.value, lang: cLang.value, pages, total, days: daysText,
    speed: speedInput.nextElementSibling.textContent,
    notary: cNotary.checked, apostille: cApostille.checked,
  };
}
$("#calcForm").addEventListener("input", updateCalc);
$("#calcForm").addEventListener("change", updateCalc);

/* =========================================================
   Модальне вікно
   ========================================================= */
const modal = $("#modal");
const form = $("#orderForm");
const success = $("#formSuccess");
const calcSummary = $("#calcSummary");
let lastFocus = null;
let attachedCalc = null;

function renderCalcSummary() {
  const c = attachedCalc;
  const typeOpt = [...cType.options].find(o => o.value === c.type);
  const langOpt = [...cLang.options].find(o => o.value === c.lang);
  $("#calcSummaryText").textContent = t("calcSummary", {
    type: typeOpt?.textContent ?? c.type, lang: langOpt?.textContent ?? c.lang,
    pages: c.pages, speed: c.speed, price: fmt(c.total),
  });
}
function setCalcSummary(data) {
  attachedCalc = data;
  calcSummary.hidden = !data;
  if (data) renderCalcSummary();
}
$("#calcSummaryClear").addEventListener("click", () => setCalcSummary(null));

function openModal({ service, calc } = {}) {
  lastFocus = document.activeElement;
  form.hidden = false;
  success.hidden = true;
  hideFormError();
  if (service) $("#fService").value = service;
  setCalcSummary(calc || null);
  if (calc) {
    $("#fLang").value = calc.lang;
    const map = { "Юридичний": "Юридичний переклад", "Технічний": "Технічний переклад", "Медичний": "Медичний переклад", "Маркетинг / локалізація": "Локалізація" };
    $("#fService").value = map[calc.type] || (calc.notary ? "Нотаріальне засвідчення" : "Письмові переклади");
  }
  toggleMenu(false);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  if (window.matchMedia("(pointer: fine)").matches) setTimeout(() => $("#fName").focus(), 250);
}
function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  lastFocus?.focus?.({ preventScroll: true });
}
$$("[data-open-modal]").forEach(b => b.addEventListener("click", () => openModal()));
$("#calcOrder").addEventListener("click", () => openModal({ calc: { ...calcState } }));
$$(".card[data-service]").forEach(c => {
  c.tabIndex = 0;
  c.setAttribute("role", "button");
  const open = () => openModal({ service: c.dataset.service });
  c.addEventListener("click", open);
  c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
});
modal.addEventListener("click", e => { if (e.target.closest("[data-close-modal]")) closeModal(); });
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  if (modal.classList.contains("is-open")) closeModal();
  else if (nav.classList.contains("is-open")) toggleMenu(false);
  closeLang();
});
// Утримуємо фокус у модалці
modal.addEventListener("keydown", e => {
  if (e.key !== "Tab") return;
  const f = $$("button, input:not([tabindex='-1']), select, textarea, a[href]", modal)
    .filter(el => !el.closest("[hidden]") && !el.closest(".hp") && el.getClientRects().length);
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* =========================================================
   Телефон: українські номери форматуємо як +38 (0XX) XXX XX XX,
   іноземні — залишаємо як є (+ та цифри)
   ========================================================= */
const phone = $("#fPhone");
function phoneDigits(v) { return v.replace(/\D/g, ""); }
function formatPhone(value) {
  const hasPlus = value.trim().startsWith("+");
  let d = phoneDigits(value);
  if (!d) return hasPlus ? "+" : "";
  if (d.startsWith("0")) d = "38" + d;
  if (d.startsWith("380")) {
    const p = d.slice(2, 12); // 0XXXXXXXXX
    let out = "+38 (" + p.slice(0, 3);
    if (p.length > 3) out += ") " + p.slice(3, 6);
    if (p.length > 6) out += " " + p.slice(6, 8);
    if (p.length > 8) out += " " + p.slice(8, 10);
    return out;
  }
  return "+" + d.slice(0, 15);
}
function isValidPhone(v) {
  const d = phoneDigits(v);
  if (d.startsWith("380")) return d.length === 12;
  return d.length >= 10 && d.length <= 15;
}
phone.addEventListener("input", e => {
  // Форматуємо лише коли курсор у кінці — щоб не заважати редагуванню посередині
  if (phone.selectionStart !== phone.value.length) return;
  if (e.inputType && e.inputType.startsWith("delete")) {
    // при видаленні не «повертаємо» роздільники назад
    phone.value = phone.value.replace(/[\s()]+$/, "");
    return;
  }
  phone.value = formatPhone(phone.value);
});
phone.addEventListener("blur", () => { phone.value = formatPhone(phone.value); if (phone.value === "+") phone.value = ""; });

/* =========================================================
   Спосіб зв'язку: для Email поле email стає обов'язковим
   ========================================================= */
const email = $("#fEmail");
function emailRequired() { return form.elements.contact.value === "Email"; }
$$('input[name="contact"]').forEach(r => r.addEventListener("change", () => {
  $("#emailReq").hidden = !emailRequired();
  if (email.closest(".field").classList.contains("is-invalid")) validateField(email);
}));

/* =========================================================
   Файли: кілька, перетягування, видалення, ліміти
   ========================================================= */
const fileInput = $("#fFile");
const fileList = $("#fileList");
const fileDrop = $("#fileDrop");
const fileError = $("#fileError");
let files = [];

const humanSize = b => b < 1024 * 1024 ? Math.max(1, Math.round(b / 1024)) + " KB" : (b / 1024 / 1024).toFixed(1) + " MB";
function setFileError(msg) {
  fileError.textContent = msg || "";
  fileError.classList.toggle("is-shown", !!msg);
  fileDrop.closest(".field").classList.toggle("is-invalid", !!msg);
}
function addFiles(list) {
  setFileError("");
  for (const f of list) {
    if (files.length >= CONFIG.maxFiles) { setFileError(t("errFileCount", { n: CONFIG.maxFiles })); break; }
    if (f.size > CONFIG.maxFileMb * 1024 * 1024) { setFileError(t("errFileSize", { name: f.name, mb: CONFIG.maxFileMb })); continue; }
    if (files.some(x => x.name === f.name && x.size === f.size)) continue;
    files.push(f);
  }
  renderFiles();
}
function renderFiles() {
  fileList.innerHTML = "";
  files.forEach((f, i) => {
    const li = document.createElement("li");
    li.innerHTML = `<span class="name"></span><span class="size">${humanSize(f.size)}</span><button type="button" aria-label="×">×</button>`;
    li.querySelector(".name").textContent = f.name;
    li.querySelector("button").addEventListener("click", () => { files.splice(i, 1); setFileError(""); renderFiles(); });
    fileList.appendChild(li);
  });
}
fileInput.addEventListener("change", () => { addFiles(fileInput.files); fileInput.value = ""; });
["dragenter", "dragover"].forEach(ev => fileDrop.addEventListener(ev, e => { e.preventDefault(); fileDrop.classList.add("is-drag"); }));
["dragleave", "drop"].forEach(ev => fileDrop.addEventListener(ev, e => { e.preventDefault(); fileDrop.classList.remove("is-drag"); }));
fileDrop.addEventListener("drop", e => addFiles(e.dataTransfer.files));

/* =========================================================
   Валідація та відправка
   ========================================================= */
const validators = {
  name: v => v.trim().length >= 2,
  phone: v => isValidPhone(v),
  email: v => (!v.trim() && !emailRequired()) || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()),
};
function validateField(input) {
  const ok = validators[input.name](input.value);
  const field = input.closest(".field");
  field.classList.toggle("is-invalid", !ok);
  input.setAttribute("aria-invalid", !ok);
  return ok;
}
Object.keys(validators).forEach(name => {
  const input = form.elements[name];
  input.addEventListener("blur", () => { if (input.value) validateField(input); });
  input.addEventListener("input", () => { if (input.closest(".field").classList.contains("is-invalid")) validateField(input); });
});
const agree = form.elements.agree;
agree.addEventListener("change", () => $("#agreeBox").classList.toggle("is-invalid", !agree.checked));

const formError = $("#formError");
function showFormError() {
  formError.innerHTML = "";
  formError.append(t("errNet"));
  const a = document.createElement("a");
  a.href = "tel:+380991234567";
  a.textContent = "+38 (099) 123 45 67";
  formError.append(a);
  formError.hidden = false;
}
function hideFormError() { formError.hidden = true; }

function buildFormData() {
  const fd = new FormData(form);
  fd.delete("files[]");
  files.forEach(f => fd.append("files[]", f, f.name));
  fd.set("phone", formatPhone(phone.value));
  fd.set("site_lang", currentLang);
  fd.set("page", location.href);
  if (attachedCalc) {
    const c = attachedCalc;
    const extras = [c.notary && "нотаріальне засвідчення", c.apostille && "апостиль"].filter(Boolean).join(", ");
    fd.set("calc", `${c.type}, ${c.lang}, ${c.pages} стор., ${c.speed}${extras ? ", " + extras : ""} — від ${fmt(c.total)} грн (${c.days})`);
  }
  return fd;
}

form.addEventListener("submit", async e => {
  e.preventDefault();
  hideFormError();
  const inputs = Object.keys(validators).map(n => form.elements[n]);
  const results = inputs.map(validateField);
  $("#agreeBox").classList.toggle("is-invalid", !agree.checked);
  if (results.includes(false) || !agree.checked) {
    (inputs[results.indexOf(false)] || agree).focus();
    return;
  }

  const btn = $(".form__submit", form);
  const btnText = $(".form__submit-text", btn);
  btn.classList.add("is-loading");
  btn.disabled = true;
  btnText.textContent = t("fSending");

  try {
    const fd = buildFormData();
    if (CONFIG.demo) {
      await new Promise(r => setTimeout(r, 900));
      console.info("[Демо-режим] Заявка:", Object.fromEntries(fd));
    } else {
      const ctrl = new AbortController();
      const timer = setTimeout(() => ctrl.abort(), 30000);
      const res = await fetch(CONFIG.endpoint, { method: "POST", body: fd, headers: { Accept: "application/json" }, signal: ctrl.signal });
      clearTimeout(timer);
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || res.status);
    }
    form.reset();
    files = []; renderFiles(); setFileError("");
    setCalcSummary(null);
    $("#emailReq").hidden = true;
    $$(".field.is-invalid", form).forEach(f => f.classList.remove("is-invalid"));
    form.hidden = true;
    success.hidden = false;
    $("button", success).focus();
  } catch (err) {
    console.error("Помилка відправки заявки:", err);
    showFormError();
  } finally {
    btn.classList.remove("is-loading");
    btn.disabled = false;
    btnText.textContent = t("fSubmit");
  }
});

/* =========================================================
   Старт
   ========================================================= */
$("#year").textContent = new Date().getFullYear();
syncThemeLabel();
updateCalc();
try {
  const saved = localStorage.getItem("fenix-lang");
  if (saved && saved !== "uk") setLang(saved);
} catch (e) {}
onScroll();
buildDots();
startAuto();
