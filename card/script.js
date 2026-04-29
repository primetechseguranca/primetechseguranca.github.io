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

const gallery = document.getElementById("gallery");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

if (gallery) {
  next.onclick = () => {
    gallery.scrollBy({ left: 200, behavior: "smooth" });
  };

  prev.onclick = () => {
    gallery.scrollBy({ left: -200, behavior: "smooth" });
  };
}

const galleryImages = document.querySelectorAll(".gallery img");
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxCounter = document.getElementById("lightboxCounter");
const lightboxThumbs = document.getElementById("lightboxThumbs");
const closeLightbox = document.getElementById("closeLightbox");
const lightboxPrev = document.getElementById("lightboxPrev");
const lightboxNext = document.getElementById("lightboxNext");

let currentImageIndex = 0;
let imageList = [];

function openLightbox(index) {
  imageList = Array.from(galleryImages).map(img => img.src);
  currentImageIndex = index;
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";
  renderLightbox();
}

function renderLightbox() {
  lightboxImage.src = imageList[currentImageIndex];
  lightboxCounter.textContent = `${currentImageIndex + 1} / ${imageList.length} fotos`;

  lightboxThumbs.innerHTML = "";

  imageList.forEach((src, index) => {
    const thumb = document.createElement("img");
    thumb.src = src;

    if (index === currentImageIndex) {
      thumb.classList.add("active");
    }

    thumb.addEventListener("click", () => {
      currentImageIndex = index;
      renderLightbox();
    });

    lightboxThumbs.appendChild(thumb);
  });
}

function closeGallery() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % imageList.length;
  renderLightbox();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + imageList.length) % imageList.length;
  renderLightbox();
}

galleryImages.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

closeLightbox.addEventListener("click", closeGallery);
lightboxNext.addEventListener("click", nextImage);
lightboxPrev.addEventListener("click", prevImage);

lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeGallery();
  }
});

document.addEventListener("keydown", (event) => {
  if (!lightbox.classList.contains("active")) return;

  if (event.key === "Escape") closeGallery();
  if (event.key === "ArrowRight") nextImage();
  if (event.key === "ArrowLeft") prevImage();
});