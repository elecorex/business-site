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
      return;
    }

    window.location.href = "index.html#contact";
  });
}

const scrollTopButton = document.querySelector(".scroll-top");
if (scrollTopButton) {
  const updateScrollTopVisibility = () => {
    if (window.scrollY > 240) {
      scrollTopButton.classList.add("show");
    } else {
      scrollTopButton.classList.remove("show");
    }
  };

  updateScrollTopVisibility();
  window.addEventListener("scroll", updateScrollTopVisibility);

  scrollTopButton.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}
