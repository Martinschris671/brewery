document.addEventListener("DOMContentLoaded", function () {
  // Elements
  const slidesContainer = document.getElementById("slides");
  const slides = document.querySelectorAll(".page");
  const navDots = document.querySelectorAll(".nav-dot");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  const progressBar = document.getElementById("progress");

  // Variables
  let currentSlide = 0;
  let progressAnimationFrame;
  let slideTimeout;
  const totalSlides = slides.length;
  const slideDuration = 8000; // 8 seconds per slide
  let startTime;

  // Initialize
  setupSlides();
  startAutoSlide();

  // Setup slides
  function setupSlides() {
    // Set active class for first slide
    slides[0].classList.add("active");

    // Set up event listeners
    navDots.forEach((dot) => {
      dot.addEventListener("click", navigateToSlide);
    });

    prevBtn.addEventListener("click", previousSlide);
    nextBtn.addEventListener("click", nextSlide);

    // Mobile swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    slidesContainer.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
    });

    slidesContainer.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    function handleSwipe() {
      if (touchEndX < touchStartX - 50) {
        nextSlide();
      } else if (touchEndX > touchStartX + 50) {
        previousSlide();
      }
    }
  }

  // Navigate to specific slide
  function navigateToSlide(e) {
    const targetIndex = parseInt(e.target.getAttribute("data-index"));
    if (targetIndex !== currentSlide) {
      goToSlide(targetIndex);
    }
  }

  // Go to specific slide
  function goToSlide(index) {
    // Cancel any ongoing animations
    cancelAnimationFrame(progressAnimationFrame);
    clearTimeout(slideTimeout);

    // Remove active class from current slide and dot
    slides[currentSlide].classList.remove("active");
    navDots[currentSlide].classList.remove("active");

    // Update current slide
    currentSlide = index;

    // Add active class to new slide and dot
    slides[currentSlide].classList.add("active");
    navDots[currentSlide].classList.add("active");

    // Update transform with smooth transition
    slidesContainer.style.transform = `translateX(-${currentSlide * 20}%)`;

    // Start new progress animation
    startProgressAnimation();
  }

  // Previous slide
  function previousSlide() {
    const newIndex = currentSlide === 0 ? totalSlides - 1 : currentSlide - 1;
    goToSlide(newIndex);
  }

  // Next slide
  function nextSlide() {
    const newIndex = currentSlide === totalSlides - 1 ? 0 : currentSlide + 1;
    goToSlide(newIndex);
  }

  // Auto slide
  function startAutoSlide() {
    startProgressAnimation();
  }

  // Ultra-smooth progress animation using requestAnimationFrame
  function startProgressAnimation() {
    // Reset progress bar
    progressBar.style.transition = "none";
    progressBar.style.width = "0%";

    // Force reflow to ensure the transition reset is applied
    progressBar.offsetHeight;

    // Initialize animation variables
    startTime = performance.now();

    // Set smooth transition
    progressBar.style.transition = `width ${slideDuration}ms linear`;
    progressBar.style.width = "100%";

    // Schedule next slide
    slideTimeout = setTimeout(nextSlide, slideDuration);
  }

  // Handle visibility change to prevent animation issues when tab is inactive
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      // Pause animations when tab is not visible
      clearTimeout(slideTimeout);
      cancelAnimationFrame(progressAnimationFrame);
      progressBar.style.transition = "none";
    } else {
      // Resume when tab becomes visible again
      startProgressAnimation();
    }
  });

  // Handle window resize to ensure animations remain smooth
  window.addEventListener("resize", function () {
    // Reset slide position and progress
    slidesContainer.style.transition = "none";
    slidesContainer.style.transform = `translateX(-${currentSlide * 20}%)`;

    // Force reflow
    slidesContainer.offsetHeight;

    // Restore transition
    slidesContainer.style.transition =
      "transform 0.8s cubic-bezier(0.645, 0.045, 0.355, 1)";
  });
});
