/* =========================================================
   Бюро перекладів «Фенікс» — інтерактив
   ========================================================= */

// Куди надсилати заявки. Залиште порожнім — форма працюватиме в демо-режимі.
// Наприклад: "https://formspree.io/f/xxxxxxx" або ваш PHP-обробник "send.php".
const FORM_ENDPOINT = "";

const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

/* ---------- i18n ---------- */
const I18N = {
  en: {
    logoSub: "Translation Bureau",
    navHome: "Home", navServices: "Services", navLanguages: "Languages", navAbout: "About", navReviews: "Reviews", navContacts: "Contacts",
    ctaRequest: "Send a request",
    heroEyebrow: "Professional translation — without borders",
    heroTitle1: "Phoenix", heroTitle2: "Translation Bureau",
    heroText: "Quality translations for your success anywhere in the world. We combine professionalism, experience and modern technology so your words work for you.",
    heroOrder: "Order a translation", heroMore: "Learn more",
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
    langEyebrow: "Languages", langTitle: "We work with all popular languages", langAll: "All languages", langLess: "Show less",
    lUk: "Ukrainian", lEn: "English", lDe: "German", lFr: "French", lEs: "Spanish", lIt: "Italian", lPl: "Polish", lZh: "Chinese",
    lJa: "Japanese", lTr: "Turkish", lSv: "Swedish", lNl: "Dutch", lEl: "Greek", lCs: "Czech", lAr: "Arabic", lPt: "Portuguese", lMore: "and more",
    revEyebrow: "Reviews", revTitle: "Trusted by clients",
    r1: "“Fast, high quality, professional! Very happy with the cooperation — I recommend it!”",
    r2: "“Documents were translated on time, clearly and without mistakes. Many thanks to the Phoenix team!”",
    r3: "“True professionals! I especially liked the communication and the speed.”",
    r4: "“Ordered an apostille and notarized diploma translation — all done in two days. Thank you!”",
    r5: "“They localized our website into three languages. Attentive to detail and kept us updated.”",
    clientF: "Client", clientM: "Client",
    ctaTitle: "Ready to order a translation?", ctaText: "Contact us right now — and we'll find the best solution for you.",
    ctaOnline: "Online across Ukraine and worldwide",
    copyright: "Phoenix Translation Bureau. All rights reserved.",
    formTitle: "Send a request", formSub: "Fill in the form — we'll get back to you within 15 minutes.",
    fName: "Name *", fPhone: "Phone *", fService: "Service", fLang: "Language",
    fFile: "File for a quote (optional)", fFileBtn: "Attach a document", fMsg: "Comment",
    fAgree: "I agree to the processing of personal data", fSubmit: "Send request",
    errName: "Please enter your name", errPhone: "Please enter a valid phone number", errEmail: "Invalid email",
    okTitle: "Thank you!", okText: "Your request has been received. Our manager will contact you shortly.", okClose: "Close",
    toastErr: "Could not send. Please call us or try again.",
    serviceOpts: ["Written translation", "Interpreting", "Localization", "Notarization", "Apostille", "Technical translation", "Medical translation", "Legal translation", "Urgent translation", "Editing"],
    langOpts: ["English", "German", "French", "Spanish", "Italian", "Polish", "Chinese", "Japanese", "Turkish", "Other"],
  },
};
// Українські тексти беремо прямо з HTML
I18N.uk = {};
$$("[data-i18n]").forEach(el => { I18N.uk[el.dataset.i18n] = el.textContent.trim(); });
I18N.uk.servicesLess = "Згорнути";
I18N.uk.langLess = "Згорнути";
I18N.uk.toastErr = "Не вдалося надіслати. Зателефонуйте нам або спробуйте ще раз.";
I18N.uk.serviceOpts = $$("#fService option").map(o => o.textContent);
I18N.uk.langOpts = $$("#fLang option").map(o => o.textContent);

let currentLang = "uk";
const t = key => I18N[currentLang][key] ?? I18N.uk[key] ?? key;

function setLang(lang) {
  if (!I18N[lang]) return;
  currentLang = lang;
  document.documentElement.lang = lang;
  $$("[data-i18n]").forEach(el => { el.textContent = t(el.dataset.i18n); });
  $$("#fService option").forEach((o, i) => { o.textContent = t("serviceOpts")[i]; });
  $$("#fLang option").forEach((o, i) => { o.textContent = t("langOpts")[i]; });
  $(".lang__current").textContent = lang === "uk" ? "UA" : lang.toUpperCase();
  $$(".lang__menu button").forEach(b => b.classList.toggle("is-current", b.dataset.lang === lang));
  syncToggleLabels();
  try { localStorage.setItem("fenix-lang", lang); } catch (e) {}
}

/* ---------- Language dropdown ---------- */
const langBox = $("#lang");
const langBtn = $(".lang__btn", langBox);
langBtn.addEventListener("click", e => {
  e.stopPropagation();
  const open = langBox.classList.toggle("is-open");
  langBtn.setAttribute("aria-expanded", open);
});
$$(".lang__menu button").forEach(b => b.addEventListener("click", () => {
  setLang(b.dataset.lang);
  langBox.classList.remove("is-open");
  langBtn.setAttribute("aria-expanded", "false");
}));
document.addEventListener("click", e => {
  if (!langBox.contains(e.target)) {
    langBox.classList.remove("is-open");
    langBtn.setAttribute("aria-expanded", "false");
  }
});

/* ---------- Header: scroll state, active link, to-top ---------- */
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

/* ---------- Mobile menu ---------- */
const burger = $("#burger");
const nav = $("#nav");
function toggleMenu(force) {
  const open = force ?? !nav.classList.contains("is-open");
  nav.classList.toggle("is-open", open);
  burger.classList.toggle("is-active", open);
  burger.setAttribute("aria-expanded", open);
  burger.setAttribute("aria-label", open ? "Закрити меню" : "Відкрити меню");
  header.classList.toggle("menu-open", open);
  document.body.classList.toggle("no-scroll", open);
}
burger.addEventListener("click", () => toggleMenu());
navLinks.forEach(l => l.addEventListener("click", () => toggleMenu(false)));
window.addEventListener("resize", () => { if (window.innerWidth > 1024) toggleMenu(false); });

/* ---------- Show all services / languages ---------- */
const servicesSec = $("#services");
const langsSec = $("#languages");

function syncToggleLabels() {
  const sLabel = $("[data-toggle-services] span");
  sLabel.textContent = t(servicesSec.classList.contains("show-all") ? "servicesLess" : "servicesAll");
  const lLabel = $(".section__head [data-toggle-langs] span");
  lLabel.textContent = t(langsSec.classList.contains("show-all") ? "langLess" : "langAll");
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

/* ---------- Reveal on scroll ---------- */
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

/* ---------- Reviews slider ---------- */
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
  if (n <= 1) return;
  for (let i = 0; i < n; i++) {
    const d = document.createElement("button");
    d.type = "button";
    d.setAttribute("aria-label", `${i + 1}`);
    d.addEventListener("click", () => goTo(i));
    dotsBox.appendChild(d);
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

// Автопрокрутка, пауза при наведенні / дотику
let autoplay;
const startAuto = () => { stopAuto(); autoplay = setInterval(() => {
  const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 2;
  goTo(atEnd ? 0 : currentIndex() + 1);
}, 6000); };
const stopAuto = () => clearInterval(autoplay);
["mouseenter", "touchstart", "focusin"].forEach(ev => track.addEventListener(ev, stopAuto, { passive: true }));
["mouseleave", "touchend", "focusout"].forEach(ev => track.addEventListener(ev, startAuto, { passive: true }));

/* ---------- Modal ---------- */
const modal = $("#modal");
const form = $("#orderForm");
const success = $("#formSuccess");
let lastFocus = null;

function openModal(service) {
  lastFocus = document.activeElement;
  form.hidden = false;
  success.hidden = true;
  if (service) {
    const idx = I18N.uk.serviceOpts.indexOf(service);
    if (idx > -1) $("#fService").selectedIndex = idx;
  }
  toggleMenu(false);
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("no-scroll");
  setTimeout(() => $("#fName").focus(), 250);
}
function closeModal() {
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("no-scroll");
  lastFocus?.focus?.();
}
$$("[data-open-modal]").forEach(b => b.addEventListener("click", () => openModal()));
$$(".card[data-service]").forEach(c => {
  c.tabIndex = 0;
  c.setAttribute("role", "button");
  const open = () => openModal(c.dataset.service);
  c.addEventListener("click", open);
  c.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
});
modal.addEventListener("click", e => { if (e.target.closest("[data-close-modal]")) closeModal(); });
document.addEventListener("keydown", e => {
  if (e.key !== "Escape") return;
  if (modal.classList.contains("is-open")) closeModal();
  else if (nav.classList.contains("is-open")) toggleMenu(false);
});
// Утримуємо фокус у модалці
modal.addEventListener("keydown", e => {
  if (e.key !== "Tab") return;
  const f = $$("button, input, select, textarea, a[href]", modal).filter(el => !el.closest("[hidden]") && el.offsetParent !== null);
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});

/* ---------- Phone mask: +38 (0XX) XXX XX XX ---------- */
const phone = $("#fPhone");
function formatPhone(value) {
  let d = value.replace(/\D/g, "");
  if (d.startsWith("38")) d = d.slice(2);
  d = d.slice(0, 10);
  if (!d) return "";
  let out = "+38 (" + d.slice(0, 3);
  if (d.length >= 3) out += ") " + d.slice(3, 6);
  if (d.length >= 6) out += " " + d.slice(6, 8);
  if (d.length >= 8) out += " " + d.slice(8, 10);
  return out;
}
phone.addEventListener("input", () => { phone.value = formatPhone(phone.value); });
phone.addEventListener("focus", () => { if (!phone.value) phone.value = "+38 ("; });
phone.addEventListener("blur", () => { if (phone.value === "+38 (") phone.value = ""; });

/* ---------- File name ---------- */
$("#fFile").addEventListener("change", e => {
  const file = e.target.files[0];
  const label = $(".file__name");
  if (file) { label.textContent = file.name; label.removeAttribute("data-i18n"); }
  else { label.dataset.i18n = "fFileBtn"; label.textContent = t("fFileBtn"); }
});

/* ---------- Validation & submit ---------- */
const validators = {
  name: v => v.trim().length >= 2,
  phone: v => v.replace(/\D/g, "").length === 12,
  email: v => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
};
function validateField(input) {
  const check = validators[input.name];
  if (!check) return true;
  const ok = check(input.value);
  input.closest(".field").classList.toggle("is-invalid", !ok);
  return ok;
}
Object.keys(validators).forEach(name => {
  const input = form.elements[name];
  input.addEventListener("blur", () => { if (input.value) validateField(input); });
  input.addEventListener("input", () => {
    if (input.closest(".field").classList.contains("is-invalid")) validateField(input);
  });
});

form.addEventListener("submit", async e => {
  e.preventDefault();
  const inputs = Object.keys(validators).map(n => form.elements[n]);
  const results = inputs.map(validateField);
  const agree = form.elements.agree.checked;
  if (!agree) form.elements.agree.closest(".check").animate(
    [{ transform: "translateX(0)" }, { transform: "translateX(-6px)" }, { transform: "translateX(6px)" }, { transform: "translateX(0)" }],
    { duration: 300 });
  if (results.includes(false) || !agree) {
    inputs[results.indexOf(false)]?.focus();
    return;
  }

  const btn = $(".form__submit", form);
  btn.classList.add("is-loading");
  try {
    if (FORM_ENDPOINT) {
      const res = await fetch(FORM_ENDPOINT, { method: "POST", body: new FormData(form), headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(res.status);
    } else {
      await new Promise(r => setTimeout(r, 900)); // демо-режим
      console.info("Заявка (демо):", Object.fromEntries(new FormData(form)));
    }
    form.reset();
    $("#fFile").dispatchEvent(new Event("change"));
    form.hidden = true;
    success.hidden = false;
    $("button", success).focus();
  } catch (err) {
    showToast(t("toastErr"));
  } finally {
    btn.classList.remove("is-loading");
  }
});

/* ---------- Toast ---------- */
function showToast(text) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = text;
  document.body.appendChild(el);
  requestAnimationFrame(() => el.classList.add("is-visible"));
  setTimeout(() => { el.classList.remove("is-visible"); setTimeout(() => el.remove(), 400); }, 3500);
}

/* ---------- Init ---------- */
$("#year").textContent = new Date().getFullYear();
try {
  const saved = localStorage.getItem("fenix-lang");
  if (saved && saved !== "uk") setLang(saved);
} catch (e) {}
onScroll();
buildDots();
startAuto();
