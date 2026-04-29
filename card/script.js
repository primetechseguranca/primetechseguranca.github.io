// Animação suave ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".hero, .glass, .service-card, .gallery-section, .review-card, .cta"
  );

  elements.forEach((el, index) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(25px)";
    el.style.transition = "0.6s ease";

    setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, index * 120);
  });
});

// Efeito premium no botão flutuante do WhatsApp
const whatsappBtn = document.querySelector(".float-whatsapp");

if (whatsappBtn) {
  setInterval(() => {
    whatsappBtn.classList.add("pulse");

    setTimeout(() => {
      whatsappBtn.classList.remove("pulse");
    }, 900);
  }, 3500);
}

// Animação ao rolar a página
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  {
    threshold: 0.15
  }
);

document.querySelectorAll(".service-card, .review-card, .glass, .cta").forEach(el => {
  el.classList.add("hidden");
  observer.observe(el);
});