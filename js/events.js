// Mock event data array
const eventData = [
    {
        title: "EVENT 1",
        location: "LOCATION",
        time: "TIME",
        description: "Some very first words of this article Some very first words of this article Some very first words of this article Some very first words of this articleSome very fir",
        imageUrl: "https://picsum.photos/seed/art/400/300"
    },
    {
        title: "EVENT 2",
        location: "LOCATION",
        time: "TIME",
        description: "Some very first words of this article Some very first words of this article Some very first words of this article Some very first words of this articleSome very fir",
        imageUrl: "https://picsum.photos/seed/music/400/300"
    }
];
function renderEvents(){
// Target container
const eventGrid = document.querySelector('.event-grid');

// Function to create and append event cards
eventData.forEach(event => {
    const card = document.createElement('div');
    card.classList.add('event-card');

    card.innerHTML = `
        <div class="card-content">
            <h2 class="event-card-title">${event.title}</h2>
            <p class="event-location">${event.location}</p>
            <p class="event-time">${event.time}</p>
            <p class="event-description">${event.description}</p>
            <button class="signup-button">SIGN UP NOW</button>
        </div>
        <div class="image-placeholder" style="background-image: url('${event.imageUrl}');"></div>
    `;

    eventGrid.appendChild(card);
});
}
