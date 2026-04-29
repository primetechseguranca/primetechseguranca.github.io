document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".hero, .glass, .service-card, .gallery-section, .review-card, .save-contact, .cta"
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.15 }
  );

  animatedElements.forEach(el => {
    el.classList.add("hidden");
    observer.observe(el);
  });

  const whatsappBtn = document.querySelector(".float-whatsapp");

  if (whatsappBtn) {
    setInterval(() => {
      whatsappBtn.classList.add("pulse");

      setTimeout(() => {
        whatsappBtn.classList.remove("pulse");
      }, 900);
    }, 3500);
  }

  const galleryScroll = document.getElementById("gallery");
  const nextBtn = document.querySelector(".next");
  const prevBtn = document.querySelector(".prev");

  if (galleryScroll) {
    nextBtn?.addEventListener("click", () => {
      galleryScroll.scrollBy({ left: 180, behavior: "smooth" });
    });

    prevBtn?.addEventListener("click", () => {
      galleryScroll.scrollBy({ left: -180, behavior: "smooth" });
    });

    setInterval(() => {
      const reachedEnd =
        galleryScroll.scrollLeft + galleryScroll.clientWidth >= galleryScroll.scrollWidth - 5;

      if (reachedEnd) {
        galleryScroll.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        galleryScroll.scrollBy({ left: 180, behavior: "smooth" });
      }
    }, 4000);
  }

  const galleryImages = document.querySelectorAll(".gallery-item img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxCounter = document.getElementById("lightboxCounter");
  const lightboxThumbs = document.getElementById("lightboxThumbs");
  const closeLightbox = document.getElementById("closeLightbox");
  const lightboxPrev = document.getElementById("lightboxPrev");
  const lightboxNext = document.getElementById("lightboxNext");

  if (!galleryImages.length || !lightbox) return;

  let current = 0;
  const images = Array.from(galleryImages).map(img => img.src);

  function renderLightbox() {
    lightboxImage.src = images[current];
    lightboxCounter.textContent = `${current + 1} / ${images.length} fotos`;
    lightboxThumbs.innerHTML = "";

    images.forEach((src, index) => {
      const thumb = document.createElement("img");
      thumb.src = src;

      if (index === current) {
        thumb.classList.add("active");
      }

      thumb.addEventListener("click", () => {
        current = index;
        renderLightbox();
      });

      lightboxThumbs.appendChild(thumb);
    });
  }

  function openLightbox(index) {
    current = index;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
    renderLightbox();
  }

  function closeGallery() {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  }

  function nextImage() {
    current = (current + 1) % images.length;
    renderLightbox();
  }

  function prevImage() {
    current = (current - 1 + images.length) % images.length;
    renderLightbox();
  }

  galleryImages.forEach((img, index) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => openLightbox(index));
  });

  closeLightbox.addEventListener("click", closeGallery);
  lightboxNext.addEventListener("click", nextImage);
  lightboxPrev.addEventListener("click", prevImage);

  lightbox.addEventListener("click", event => {
    if (event.target === lightbox) {
      closeGallery();
    }
  });

  document.addEventListener("keydown", event => {
    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") closeGallery();
    if (event.key === "ArrowRight") nextImage();
    if (event.key === "ArrowLeft") prevImage();
  });

  let startX = 0;

  lightbox.addEventListener("touchstart", event => {
    startX = event.touches[0].clientX;
  });

  lightbox.addEventListener("touchend", event => {
    const endX = event.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) nextImage();
    if (diff < -50) prevImage();
  });
});