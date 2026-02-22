const revealItems = document.querySelectorAll(
  ".section, .hero-grid, .contact-card, .footer"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => {
  item.classList.add("reveal");
  observer.observe(item);
});

const navButton = document.querySelector(".nav-cta");
if (navButton) {
  navButton.addEventListener("click", () => {
    const contact = document.querySelector("#contact");
    if (contact) {
      contact.scrollIntoView({ behavior: "smooth" });
    }
  });
}

const langButtons = document.querySelectorAll("[data-lang-switch]");
const metaDesc = document.querySelector("#meta-desc");
const titleEl = document.querySelector("title");
const inputFields = document.querySelectorAll("[data-placeholder-en]");

const applyLanguage = (lang) => {
  const safeLang = lang === "zh" ? "zh" : "en";
  document.body.classList.remove("lang-en", "lang-zh");
  document.body.classList.add(`lang-${safeLang}`);
  document.documentElement.setAttribute("lang", safeLang === "zh" ? "zh-CN" : "en");

  langButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.langSwitch === safeLang);
  });

  if (metaDesc) {
    const desc = metaDesc.dataset[`desc${safeLang === "zh" ? "Zh" : "En"}`];
    if (desc) metaDesc.setAttribute("content", desc);
  }

  if (titleEl) {
    const title = titleEl.dataset[`title${safeLang === "zh" ? "Zh" : "En"}`];
    if (title) titleEl.textContent = title;
  }

  inputFields.forEach((field) => {
    const placeholder = field.dataset[`placeholder${safeLang === "zh" ? "Zh" : "En"}`];
    if (placeholder) field.setAttribute("placeholder", placeholder);
  });

  localStorage.setItem("elecorex-lang", safeLang);
};

langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    applyLanguage(btn.dataset.langSwitch);
  });
});

const savedLang = localStorage.getItem("elecorex-lang");
applyLanguage(savedLang || "en");
