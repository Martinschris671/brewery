// Team members data
const teamMembers = [
  {
    name: "Alexander chuks",
    title: "Founder & CEO",
    bio: "After studying brewing techniques across Europe and returning to his hometown of Imo, Alexander founded the company with a vision to create world-class beers using local ingredients and supporting the community.",
    image: "gallery/owner.jpg",
    social: ["linkedin", "twitter"],
  },
  {
    name: "Alexander chisom",
    title: "Co-Founder & Master Brewer",
    bio: "With over 15 years of brewing experience and a degree in Biochemistry, chisom oversees all brewing operations and has developed our award-winning recipes from traditional Nigerian ingredients.",
    image: "gallery/c.jpeg",
    social: ["linkedin", "instagram"],
  },
  {
    name: "Emmanuel Okafor",
    title: "Operations Director",
    bio: "Emmanuel ensures that our brewing processes maintain the highest standards while scaling to meet growing demand. His background in industrial engineering has been crucial to our expansion.",
    image: "gallery/f.jpg",
    social: ["linkedin"],
  },
  {
    name: "Ngozi Eze",
    title: "Marketing Director",
    bio: "Ngozi has built our brand from the ground up, highlighting our commitment to quality, sustainability, and Nigerian heritage. Her innovative campaigns have made us a household name across Nigeria.",
    image: "gallery/stella.jpg",
    social: ["linkedin", "twitter", "instagram"],
  },
  {
    name: "Oluchi Mbanefo",
    title: "Finance Director",
    bio: "Oluchi's strategic financial planning has allowed us to grow sustainably while investing in new brewing technologies and expanding our facility without compromising our commitment to quality.",
    image: "gallery/aa.jpeg",
    social: ["linkedin"],
  },
  {
    name: "Micheal Obama",
    title: "Head of Distribution",
    bio: "Micheal has built distribution networks across Nigeria and neighboring countries, ensuring our beers reach customers in perfect condition while minimizing our environmental footprint.",
    image: "gallery/d.png",
    social: ["linkedin", "twitter"],
  },
];

// Social media icons using HTML entities or simple text for demonstration
const socialIcons = {
  linkedin: "in",
  twitter: "tw",
  instagram: "ig",
};

// Function to create team member HTML
function createTeamMemberHTML(member, index) {
  const socialLinksHTML = member.social
    .map(
      (platform) =>
        `<a href="#" class="social-link">${socialIcons[platform]}</a>`
    )
    .join("");

  return `
            <div class="team-member" style="animation: fadeIn 0.8s ease-out forwards ${
              0.2 + index * 0.1
            }s;">
                <div class="member-image">
                    <img src="${member.image}" alt="${member.name}">
                    <div class="member-overlay">
                        <div class="member-title">${member.title}</div>
                        <h3 class="member-name">${member.name}</h3>
                        <p class="member-bio">${member.bio}</p>
                        <div class="social-links">
                            ${socialLinksHTML}
                        </div>
                    </div>
                </div>
            </div>
        `;
}

// Render team members to the page
document.addEventListener("DOMContentLoaded", () => {
  const teamGrid = document.getElementById("team-grid");

  // Sort team members by hierarchy (based on titles)
  const titleHierarchy = {
    "Founder & CEO": 1,
    "Co-Founder & Master Brewer": 2,
    "Operations Director": 3,
    "Marketing Director": 4,
    "Finance Director": 5,
    "Head of Distribution": 6,
  };

  const sortedMembers = [...teamMembers].sort((a, b) => {
    return titleHierarchy[a.title] - titleHierarchy[b.title];
  });

  // Add team members to the grid
  sortedMembers.forEach((member, index) => {
    teamGrid.innerHTML += createTeamMemberHTML(member, index);
  });

  // Animate team members on scroll
  const teamMemberElements = document.querySelectorAll(".team-member");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }
      });
    },
    { threshold: 0.1 }
  );

  teamMemberElements.forEach((member) => {
    observer.observe(member);
  });
});
