// navbar-model.js

// === CONFIGURATION ===
const navbarConfig = {
    logoLink: "index.html",
    logoSrc: "image/logo.png",
    navItems: [
      { text: "Vibe", href: "about.html" },
      { text: "Menu", href: "project_list.html" },
      { text: "Diary", href: "diary.html" },
    ],
    cta: {
      text: "JOIN COMMUNITY",
      href: "https://www.instagram.com/vartner.agency/",
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
  
        <ul class="nav-menu">
          ${navbarConfig.navItems.map(item => `
            <li><a href="${item.href}">${item.text}</a></li>
          `).join('')}
        </ul>
  
        <a href="${navbarConfig.cta.href}" target="${navbarConfig.cta.target}" class="cta-button">
          ${navbarConfig.cta.text}
        </a>
      </div>
    `;
  
    const navbar = document.createElement('div');
    navbar.className = 'navbar';
    navbar.innerHTML = navbarHTML;
  
    document.body.prepend(navbar);
  }
  
  // === INITIALIZE ===
  document.addEventListener("DOMContentLoaded", loadNavbar);
  