document.addEventListener("DOMContentLoaded", function () {
  const cookiePopup = document.getElementById("cookie-popup");
  const acceptBtn = document.getElementById("accept-cookies");
  const customizeBtn = document.querySelector(".customize-btn");

  // Check if cookie consent is already given
  if (localStorage.getItem("cookieConsent") !== "true") {
    // Show popup after 45 seconds
    setTimeout(() => {
      cookiePopup.classList.add("show");
    }, 45000); // 45 seconds
  }

  // Handle accept button click
  acceptBtn.addEventListener("click", function () {
    localStorage.setItem("cookieConsent", "true");
    cookiePopup.classList.remove("show");

    // Add a transition effect before completely hiding
    setTimeout(() => {
      cookiePopup.style.display = "none";
    }, 500);
  });

  // For demonstration, the customize button will just close the popup
  customizeBtn.addEventListener("click", function () {
    // In a real implementation, this would show cookie preferences
    localStorage.setItem("cookieConsent", "true");
    cookiePopup.classList.remove("show");
  });
});
