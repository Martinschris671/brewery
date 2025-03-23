document.addEventListener("DOMContentLoaded", function () {
  // Load animation
  setTimeout(() => {
    document.querySelector(".nav-container").classList.add("loaded");
  }, 100);

  // Hamburger menu toggle
  const navContainer = document.querySelector(".nav-container");

  // Hover indicator animation
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach((item) => {
    const indicator = item.querySelector(".nav-indicator");

    item.addEventListener("mouseenter", () => {
      const itemHeight = item.offsetHeight;
      indicator.style.height = `${itemHeight}px`;
      indicator.style.opacity = "1";
    });

    item.addEventListener("mouseleave", () => {
      indicator.style.height = "0";
      indicator.style.opacity = "0";
    });
  });

  // Active section highlight
  function highlightActiveSection() {
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop - windowHeight / 2 &&
        scrollPosition < sectionTop + sectionHeight - windowHeight / 2
      ) {
        navItems.forEach((item) => {
          const link = item.querySelector("a");
          const href = link.getAttribute("href").substring(1);

          if (href === sectionId) {
            item.classList.add("active");
          } else {
            item.classList.remove("active");
          }
        });
      }
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop,
          behavior: "smooth",
        });
      }
    });
  });

  // Initialize
  window.addEventListener("scroll", highlightActiveSection);
  highlightActiveSection();
});

// Select the navigation elements
const navContainer = document.querySelector(".nav-container");
const navLinks = document.querySelectorAll(".nav-item a"); // Using the specific nav-item class from your CSS
const cartIcon = document.getElementById("cartIcon");

// Add CSS for hover effects dynamically
const styleSheet = document.createElement("style");
document.head.appendChild(styleSheet);

// Select all sections to detect
const sections = document.querySelectorAll(
  ".container, .beer-slider-container "
);

// Function to determine if the background is dark
function isDarkBackground(elementBgColor) {
  // Convert the background color to RGB
  const rgb = elementBgColor.match(/\d+/g);
  if (!rgb) return true; // Default to dark if can't determine

  // Calculate luminance
  const luminance = (0.299 * rgb[0] + 0.587 * rgb[1] + 0.114 * rgb[2]) / 255;

  // Return true if background is dark, false if it's light
  return luminance < 0.5;
}

// Function to update navigation elements color based on current section
function updateNavColors() {
  // Get the visible section
  let currentSection = null;
  const scrollPosition = window.scrollY + 50; // 50px offset for better detection

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSection = section;
    }
  });

  if (currentSection) {
    // Get background color of current section
    const sectionBgColor =
      window.getComputedStyle(currentSection).backgroundColor;
    const isDark = isDarkBackground(sectionBgColor);

    // Set text color based on background
    const textColor = isDark ? "white" : "black";

    // Update nav links color and border
    navLinks.forEach((link) => {
      link.style.color = textColor;
      link.style.borderColor = textColor;
    });

    // Update the nav container border color
    if (navContainer) {
      navContainer.style.borderRightColor = textColor;
    }

    // Update hover styles dynamically - use the existing CSS structure but with dynamic colors
    styleSheet.textContent = `
            /* Base text color for nav items */
            .nav-item a {
                color: ${textColor};
                opacity: 0.7;
            }
            
            /* Before pseudo-element for the line effect */
            .nav-item a::before {
                background-color: ${textColor};
            }
            
            /* Hover effect is already in the CSS */
            
            /* Nav indicator color update */
            .nav-indicator {
                background-color: ${textColor};
            }
            
            /* Active nav item styling */
            .nav-item a.active {
                opacity: 1;
            }
            
            .nav-item a.active + .nav-indicator {
                height: 100%;
                opacity: 1;
            }
        `;

    // Update cart icon color
    if (cartIcon) {
      cartIcon.style.color = textColor;
    }
  }
}

// Create nav indicators for each nav link if they don't already exist
function createNavIndicators() {
  navLinks.forEach((link) => {
    // Get the parent element of the link (nav-item)
    const parentItem = link.parentElement;

    // Check if the nav-item already has an indicator
    if (
      parentItem &&
      parentItem.classList.contains("nav-item") &&
      !parentItem.querySelector(".nav-indicator")
    ) {
      // Create the indicator element
      const indicator = document.createElement("span");
      indicator.className = "nav-indicator";

      // Insert the indicator after the link
      parentItem.appendChild(indicator);
    }
  });
}

// Set active navigation item based on current section
function setActiveNavItem() {
  const scrollPosition = window.scrollY + 100; // Offset for better detection

  // Get all sections with IDs that match nav links
  const pageLinks = {};
  navLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href && href.startsWith("#")) {
      const targetId = href.substring(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        pageLinks[targetId] = {
          link: link,
          section: targetSection,
        };
      }
    }
  });

  // Check which section is currently visible
  let currentSectionId = null;
  Object.keys(pageLinks).forEach((id) => {
    const section = pageLinks[id].section;
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      currentSectionId = id;
    }
  });

  // Remove active class from all links
  navLinks.forEach((link) => {
    link.classList.remove("active");
  });

  // Add active class to current section link
  if (currentSectionId && pageLinks[currentSectionId]) {
    pageLinks[currentSectionId].link.classList.add("active");
  }
}

// Initialize everything
document.addEventListener("DOMContentLoaded", function () {
  createNavIndicators();
  updateNavColors();
  setActiveNavItem();
});

// Update on scroll
window.addEventListener("scroll", function () {
  updateNavColors();
  setActiveNavItem();
});

// Update on window resize
window.addEventListener("resize", function () {
  updateNavColors();
  setActiveNavItem();
});
