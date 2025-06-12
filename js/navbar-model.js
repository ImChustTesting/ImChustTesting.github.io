// navbar-model.js

// === CONFIGURATION ===
const navbarConfig = {
    logoLink: "index.html",
    logoSrc: "image/logo.png",
    navItems: [
      { text: "VNQUANTUM", href: "" },
      { text: "VNQUANTUM", href: "" },
      { text: "VNQUANTUM", href: "" },
    ],
    cta: {
      text: "JOIN COMMUNITY",
      href: "",
      target: "_blank"
    }
  };
  
  // === RENDER FUNCTION ===
  function loadNavbar() {
    const navbarHTML = `
      <div class="navbar-inner">
        <a style="z-index:9999" href="${navbarConfig.logoLink}">
          <img src="${navbarConfig.logoSrc}" class="logo" />
        </a>
        <p style="font-family: 'Phudu', sans-serif; font-size: 20px; font-weight: 700;">VNQUANTUM</p>
  
        <ul class="nav-menu">
          ${navbarConfig.navItems.map(item => `
            <li style="font-family: 'Phudu', sans-serif";><a href="${item.href}">${item.text}</a></li>
          `).join('')}
        </ul>
  
        <a href="${navbarConfig.cta.href}" target="${navbarConfig.cta.target}" class="cta-button" style="font-family: 'Phudu', sans-serif; font-weight: 700;">
          ${navbarConfig.cta.text}
        </a>
      </div>
    `;
  
    const navbar = document.createElement('div');
    navbar.className = 'navbar';
    navbar.innerHTML = navbarHTML;
  
    document.body.prepend(navbar);

    setupScrollAnimation();
  }

  function setupScrollAnimation() {
  console.log('navbar-model.js running');

  let lastScrollY = window.scrollY;
  const navbar = document.querySelector('.navbar');

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {
      navbar.classList.add('navbar--hidden');
    } else {
      navbar.classList.remove('navbar--hidden');
    }

    lastScrollY = currentScrollY;
  });
}
  
  // === INITIALIZE ===
  document.addEventListener("DOMContentLoaded", loadNavbar);
  