document.addEventListener("DOMContentLoaded", function () {
  // Get news carousel elements
  const carousel = document.querySelector(".news-carousel");
  const newsItems = document.querySelectorAll(".news-item");
  const prevButton = document.querySelector(".nav-prev");
  const nextButton = document.querySelector(".nav-next");
  const dotsContainer = document.querySelector(".dots-container");
  const timerIndicator = document.querySelector(".timer-indicator");

  let currentItem = 0;
  const itemCount = newsItems.length;
  let carouselInterval;
  const intervalTime = 5000; // Time between automatic transitions (5 seconds)

  // Create dots based on number of news items
  for (let i = 0; i < itemCount; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    if (i === 0) dot.classList.add("active");
    dot.setAttribute("data-index", i);
    dot.addEventListener("click", function () {
      goToItem(parseInt(this.getAttribute("data-index")));
    });
    dotsContainer.appendChild(dot);
  }

  // Initialize timer indicator animation with RequestAnimationFrame for ultra smooth animation
  let animationFrameId;
  let startTime;
  let timerWidth = 0;

  function animateTimer(timestamp) {
    if (!startTime) startTime = timestamp;

    const elapsed = timestamp - startTime;
    timerWidth = (elapsed / intervalTime) * 100;

    if (timerWidth <= 100) {
      timerIndicator.style.width = timerWidth + "%";
      animationFrameId = requestAnimationFrame(animateTimer);
    } else {
      // Timer complete, move to next item
      timerWidth = 0;
      timerIndicator.style.width = "0%";
      startTime = null;
      nextItem();
    }
  }

  function startTimerAnimation() {
    timerWidth = 0;
    timerIndicator.style.width = "0%";
    startTime = null;
    cancelAnimationFrame(animationFrameId);
    animationFrameId = requestAnimationFrame(animateTimer);
  }

  // Function to go to a specific item
  function goToItem(index) {
    // Reset timer animation
    cancelAnimationFrame(animationFrameId);

    // Update current item index
    currentItem = index;

    // Handle edge cases
    if (currentItem < 0) {
      currentItem = itemCount - 1;
    } else if (currentItem >= itemCount) {
      currentItem = 0;
    }

    // Move the carousel
    carousel.style.transform = `translateX(-${currentItem * 100}%)`;

    // Update active dot
    document.querySelectorAll(".dot").forEach((dot, i) => {
      dot.classList.toggle("active", i === currentItem);
    });

    // Start new timer animation
    startTimerAnimation();
  }

  // Event listeners for next and previous buttons
  function nextItem() {
    goToItem(currentItem + 1);
  }

  function prevItem() {
    goToItem(currentItem - 1);
  }

  nextButton.addEventListener("click", function () {
    nextItem();
  });

  prevButton.addEventListener("click", function () {
    prevItem();
  });

  // Touch events for mobile swipe
  let touchStartX = 0;
  let touchEndX = 0;

  carousel.addEventListener("touchstart", function (e) {
    touchStartX = e.changedTouches[0].screenX;
    // Pause animation on touch
    cancelAnimationFrame(animationFrameId);
  });

  carousel.addEventListener("touchend", function (e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    // Left swipe
    if (touchEndX < touchStartX - 50) {
      nextItem();
    }
    // Right swipe
    if (touchEndX > touchStartX + 50) {
      prevItem();
    }
  }

  // Start animation
  startTimerAnimation();

  // Pause animation when mouse hovers over carousel
  carousel.addEventListener("mouseenter", function () {
    cancelAnimationFrame(animationFrameId);
  });

  // Resume animation when mouse leaves carousel
  carousel.addEventListener("mouseleave", function () {
    startTimerAnimation();
  });

  // Handle visibility change to pause/resume animation
  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      cancelAnimationFrame(animationFrameId);
    } else {
      startTimerAnimation();
    }
  });
});
