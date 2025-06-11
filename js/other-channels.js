const socialLinksData = [
    {
        name: 'discord',
        iconUrl: './image/discord.png', // Replace with your icon path
        url: 'https://discord.com'
    },
    {
        name: 'twitter',
        iconUrl: './image/twitter.png', // Replace with your icon path
        url: 'https://twitter.com'
    },
    {
        name: 'mirror',
        iconUrl: './image/mirror.png', // Replace with your icon path
        url: 'https://mirror.xyz'
    },
    {
        name: 'forum',
        iconUrl: './image/chat.png', // Replace with your icon path
        url: 'https://forum.example.com'
    },
    {
        name: 'youtube',
        iconUrl: './image/youtube.png', // Replace with your icon path
        url: 'https://youtube.com'
    }
];

// This function takes the data and builds the HTML for the buttons
function renderSocialButtons(links) {
    // Find the container element in the HTML
    const container = document.getElementById('follow-buttons');

    if (!container) {
        console.error('Follow buttons container not found!');
        return;
    }
    
    // Clear any existing buttons to avoid duplicates
    container.innerHTML = '';

    // Loop through each link in our data array
    links.forEach(link => {
        // Create a new anchor element for the button
        const button = document.createElement('a');
        button.className = 'follow-button';
        button.href = link.url;
        button.target = '_blank'; // Open link in a new tab

        // Create the image element for the icon
        const iconImg = document.createElement('img');
        iconImg.src = link.iconUrl;
        iconImg.alt = `${link.name} icon`;
        iconImg.className = 'icon';
        
        // Create a span for the text
        const buttonText = document.createElement('span');
        buttonText.textContent = link.name;

        // Add the icon and text to the button
        button.appendChild(iconImg);
        button.appendChild(buttonText);
        
        // Add the fully created button to the container on the page
        container.appendChild(button);
    });
}