
import { API_BASE_URL } from './config.js';
// The DOMAIN_IP is imported but not used in this specific logic, but we keep it for consistency.
import { DOMAIN_IP } from './config.js';


/**
 * Truncates a string to a specific word count.
 * @param {string} text - The text to truncate.
 * @param {number} count - The number of words to keep.
 * @returns {string} The truncated text with an ellipsis.
 */
function truncateWords(text, count = 12) {
  return text.split(' ').slice(0, count).join(' ') + '...';
}

/**
 * Splits a pipe-separated string of tags into an array.
 * @param {string} tagString - The string of tags (e.g., "Web Dev | UX/UI | Marketing").
 * @returns {string[]} An array of tags.
 */
function formatTags(tagString) {
  return tagString.split('|').map(tag => tag.trim());
}

/**
 * Creates the HTML for a single project card.
 * @param {object} project - The project data object.
 * @returns {string} The HTML string for the card.
 */
function createProjectCard(project) {
    const tags = formatTags(project.tags_in_home || '');
    const shortDescription = truncateWords(project.description || '', 25);
    // The banner URL is constructed using the base URL from the config file.
    const bannerUrl = `${API_BASE_URL}${project.main_banner.url}`;
    
    const slug = project.slug;
    const projectUrl = `/project_dyna.html?slug=${slug}`;

    return `
      <li class="stack-cards__item js-stack-cards__item">
        <div class="card" onclick="window.location.href='${projectUrl}'">
          <div class="card__header">
              <div class="card-title-part">
              <div class="card__title-row">
                  <h2 class="card__title">${project.Title}</h2>
                  <div class="card__tags">
                      ${tags.map(tag => `<span>${tag}</span>`).join('')}
                  </div>
                  </div>
              </div>
              <p class="card__description">
                  ${shortDescription}
                  <br><span style="font-style: italic; font-weight: bold; color: #1877f2;">Read more</span>
              </p>
          </div>
  
          <div class="card__image-container">
              <img class="card__image"
                   src="${bannerUrl}"
                   alt="${project.Title}" />
          </div>
        </div>
      </li>
    `;
}

// --- MOCK DATA for demonstration ---
// This data simulates the response you would get from your API.
// Replace this with the live `fetch` call in the function below when you are ready.
const mockApiData = {
    data: [
        {
            id: 1,
            Title: "E-Commerce Platform Rebuild",
            slug: "ecommerce-platform-rebuild",
            description: "Some very first words of this article Some very first words of this article Some very first words of this article Some very first words of this article Some very first words of this article",
            tags_in_home: "COMPUTING | QUANTUM",
            main_banner: { url: "/uploads/project_banner_1.jpg" } // Note: This image won't load, it's a placeholder path
        },
        {
            id: 2,
            Title: "Mobile Banking App",
            slug: "mobile-banking-app",
            description: "Some very first words of this article Some very first words of this article Some very first words of this article Some very first words of this article Some very first words of this article",
            tags_in_home: "ART | COMMUNITY",
            main_banner: { url: "/uploads/project_banner_2.jpg" }
        },
        {
            id: 3,
            Title: "Data Analytics Dashboard",
            slug: "data-analytics-dashboard",
            description: "Some very first words of this article Some very first words of this article Some very first words of this article Some very first words of this article Some very first words of this article",
            tags_in_home: "COMPUTING | QUANTUM",
            main_banner: { url: "/uploads/project_banner_3.jpg" }
        }
    ]
};


async function loadHomeProjects() {
    try {
        // --- OPTION 1: Use Mock Data (Current) ---
        // This uses the mock data defined above. It runs without a server.
        const projects = (mockApiData?.data || []).map(p => ({
            id: p.id,
            ...p
        }));


        const listContainer = document.querySelector('.js-stack-cards');
        if (!listContainer) {
            console.error('Card list container not found.');
            return;
        }

        if (projects.length === 0) {
            listContainer.innerHTML = '<p>No projects found.</p>';
            return;
        }

        const cardsHTML = projects.map(project => createProjectCard(project)).join('');
        listContainer.innerHTML = cardsHTML;
        
        if (typeof initializeCardAnimation === 'function') {
            initializeCardAnimation();
        }

    } catch (err) {
        console.error('Failed to load projects:', err);
        const listContainer = document.querySelector('.js-stack-cards');
        if (listContainer) {
            listContainer.innerHTML = '<p>Sorry, we could not load the projects at this time.</p>';
        }
    }
}
window.loadHomeProjects = loadHomeProjects;


