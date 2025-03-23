document.addEventListener("DOMContentLoaded", function () {
  const container = document.getElementById("experienceContainer");
  const items = document.querySelectorAll(".experience-item");
  const indicatorsContainer = document.getElementById("experienceIndicators");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;
  let intervalId;
  const totalItems = items.length;

  // Create indicators
  items.forEach((_, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add("experience-indicator");
    if (index === 0) indicator.classList.add("active");
    indicator.addEventListener("click", () => goToSlide(index));
    indicatorsContainer.appendChild(indicator);
  });

  const indicators = document.querySelectorAll(".experience-indicator");

  // Function to go to a specific slide
  function goToSlide(index) {
    currentIndex = index;
    updateSlidePosition();
    updateIndicators();
    resetInterval();
  }

  // Function to update slide position
  function updateSlidePosition() {
    container.style.transform = `translateX(-${currentIndex * 100}%)`;
  }

  // Function to update indicators
  function updateIndicators() {
    indicators.forEach((indicator, index) => {
      indicator.classList.toggle("active", index === currentIndex);
    });
  }

  // Function to go to next slide
  function nextSlide() {
    currentIndex = (currentIndex + 1) % totalItems;
    updateSlidePosition();
    updateIndicators();
  }

  // Function to go to previous slide
  function prevSlide() {
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateSlidePosition();
    updateIndicators();
  }

  // Function to reset interval
  function resetInterval() {
    clearInterval(intervalId);
    startInterval();
  }

  // Function to start interval
  function startInterval() {
    intervalId = setInterval(nextSlide, 5000);
  }

  // Event listeners
  nextBtn.addEventListener("click", () => {
    nextSlide();
    resetInterval();
  });

  prevBtn.addEventListener("click", () => {
    prevSlide();
    resetInterval();
  });

  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  container.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    if (touchStartX - touchEndX > 50) {
      nextSlide();
      resetInterval();
    } else if (touchEndX - touchStartX > 50) {
      prevSlide();
      resetInterval();
    }
  }

  // Start automatic sliding
  startInterval();
});
