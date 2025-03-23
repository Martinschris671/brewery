// Subtle animations
document.addEventListener("DOMContentLoaded", function () {
  // Form submit animation
  const form = document.querySelector(".footer-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const input = this.querySelector(".footer-input");
    const button = this.querySelector(".footer-button");

    // Simple animation
    button.textContent = "THANK YOU!";
    input.value = "";

    // Reset after 2 seconds
    setTimeout(() => {
      button.textContent = "SIGN UP";
    }, 2000);
  });

  // Smooth scroll for navigation links
  const navLinks = document.querySelectorAll(".footer-navigation a");
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      // This would typically scroll to the section
      // but we'll just add a small animation for demo
      this.style.fontWeight = "900";
      setTimeout(() => {
        this.style.fontWeight = "bold";
      }, 300);
    });
  });
});
