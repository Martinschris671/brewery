// Self-executing function to avoid global scope pollution
(function () {
  // Wait for DOM to be fully loaded
  function initBeerSlider() {
    const slides = document.querySelectorAll(".beer-slide");
    let currentSlide = 0;
    let slideInterval;
    const slideDuration = 5000; // 5 seconds

    function showSlide(index) {
      slides.forEach((slide) => {
        slide.classList.remove("active");
      });

      slides[index].classList.add("active");
      currentSlide = index;
    }

    function nextSlide() {
      const next = (currentSlide + 1) % slides.length;
      showSlide(next);
    }

    function startSlideshow() {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
      slideInterval = setInterval(nextSlide, slideDuration);
    }

    // Initialize
    showSlide(0);
    startSlideshow();

    // Clean up function for when the section is removed
    function cleanup() {
      if (slideInterval) {
        clearInterval(slideInterval);
      }
    }

    // Store cleanup function for potential future use
    window.beerSliderCleanup = cleanup;
  }

  // Check if document is already loaded
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initBeerSlider);
  } else {
    initBeerSlider();
  }
})();
