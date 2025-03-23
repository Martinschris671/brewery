// Music toggle functionality
const toggle = document.getElementById("toggle");
const status = document.getElementById("status");
const musicPlayer = document.getElementById("musicPlayer");
const musicControl = document.getElementById("musicControl");

let isPlaying = false;

toggle.addEventListener("click", () => {
  isPlaying = !isPlaying;
  toggle.classList.toggle("active");

  if (isPlaying) {
    musicPlayer.play();
    status.textContent = "Music is ON";
  } else {
    musicPlayer.pause();
    musicPlayer.currentTime = 0;
    status.textContent = "Music is OFF";
  }
});

// Dynamic color adaptation for toggle
function updateToggleColor() {
  const scrollPosition = window.scrollY + window.innerHeight / 1.1; // Add small offset for better detection

  // Get the sections
  const sections = document.querySelectorAll(".container, .music-control");

  // Find which section we're currently in
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    console.log(window.scrollY);

    // Check if we're in this section
    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      const sectionBgColor = window.getComputedStyle(section).backgroundColor;

      // Determine if the background is dark or light
      const rgb = sectionBgColor.match(/\d+/g);
      if (!rgb) continue;

      const luminance =
        (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;

      // Toggle light/dark mode based on background
      if (luminance < 0.5) {
        // Dark background
        musicControl.classList.remove("light-mode");
      } else {
        // Light background
        musicControl.classList.add("light-mode");
      }

      break;
    }
  }
}

// Initialize colors
document.addEventListener("DOMContentLoaded", updateToggleColor);

// Update toggle appearance on scroll
window.addEventListener("scroll", updateToggleColor);

// Update when window is resized
window.addEventListener("resize", updateToggleColor);
