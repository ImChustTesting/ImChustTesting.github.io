/*import { API_BASE_URL } from './config.js';
import { DOMAIN_IP } from './config.js';*/


function truncateWords(text, count = 12) {
  return text.split(' ').slice(0, count).join(' ') + '...';
}

function formatTags(tagString) {
  return tagString.split('|').map(tag => tag.trim());
}



  
  function createProjectCard(project) {
    // console.log(`${API_BASE_URL}${project.banner_image.url}`);
    // console.log (project.banner_image.url);
    const tags = formatTags(project.tags_in_home || '');
    const shortDescription = truncateWords(project.description || '', 25);
    const bannerUrl =`${API_BASE_URL}${project.main_banner.url}`;
   

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
                  Description: ${shortDescription}
               <span style="font-style: italic; font-weight: bold;">Read more</span>

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
  

async function loadHomeProjects() {
  try {
    const res = await fetch(`${API_BASE_URL}/api/projects?populate=*`);
 
    const json = await res.json();
    // console.log('JSON: ', `${API_BASE_URL}${json.data[0].main_banner.url}`);
    // ✅ Flatten the project array
    const projects = (json?.data || []).map(p => ({
      id: p.id,
      ...p
    }));


    const listContainer = document.querySelector('.js-stack-cards');
    if (!listContainer) {
      console.error('Card list container not found.');
      return;
    }

    // ✅ You can now use projects[i].Title, projects[i].slug, etc.
    const cardsHTML = projects.map(project => createProjectCard(project)).join('');
    listContainer.innerHTML = cardsHTML;

  } catch (err) {
    console.error('Failed to load projects:', err);
  }
}

document.addEventListener('DOMContentLoaded', loadHomeProjects);
