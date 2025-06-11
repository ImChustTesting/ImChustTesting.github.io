
const partnersData = [
    {
        type: 'image',
        name: 'Partner1',
        imageUrl: './image/partner1.png',
    },
    {
        type: 'image',
        name: 'Partner2',
        imageUrl: './image/partner2.png',
    },
    {
        type: 'image',
        name: 'Partner3',
        imageUrl: './image/partner3.png',
    },
    {
        type: 'image',
        name: 'Partner4',
        imageUrl: './image/partner4.png',
    }
];

// This function takes the data and builds the HTML
function renderPartners(partners) {
    // Find the container element in the HTML
    const container = document.getElementById('partner-logo-container');

    if (!container) {
        console.error('Partner logo container not found!');
        return;
    }
    
    // Clear any existing logos to avoid duplicates
    container.innerHTML = '';

    // Loop through each partner in our data array
    partners.forEach(partner => {
        // Create a new div element for the logo
        const logoDiv = document.createElement('div');
        logoDiv.className = 'partner-logo'; // a.k.a. class="partner-logo"
        logoDiv.style.backgroundColor = partner.backgroundColor;

        if (partner.type === 'placeholder') {
            logoDiv.classList.add('logo-placeholder'); // Add the specific placeholder class
            logoDiv.innerHTML = `
                <div class="placeholder-text-main">${partner.name}</div>
                <div class="placeholder-text-sub">${partner.subText}</div>
            `;
        } else {
            const logoImg = document.createElement('img');
            logoImg.src = partner.imageUrl;
            logoImg.alt = `${partner.name} Logo`;
            logoDiv.appendChild(logoImg);
        }

        // Add the fully created logo div to the container on the page
        container.appendChild(logoDiv);
    });
}
/*
document.addEventListener('DOMContentLoaded', () => {
    renderPartners(partnersData);
});*/