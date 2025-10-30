let allProperties = [];

// Load properties dynamically
fetch('properties.json')
  .then(response => response.json())
  .then(data => {
    allProperties = data;
    displayProperties(allProperties);
  })
  .catch(err => console.error('Error loading properties:', err));

function displayProperties(properties) {
  const listings = document.getElementById('listings');
  listings.innerHTML = '';

  if (properties.length === 0) {
    listings.innerHTML = '<p>No properties found.</p>';
    return;
  }

  properties.forEach(property => {
    const card = document.createElement('div');
    card.classList.add('property');
    card.innerHTML = `
      <img src="${property.image}" alt="${property.name}">
      <div class="details">
        <h3>${property.name}</h3>
        <p><strong>Type:</strong> ${property.type}</p>
        <p><strong>Amenities:</strong> ${property.amenities.join(', ')}</p>
        <p><strong>Status:</strong> <span style="color:${property.status === 'Available' ? 'green' : 'red'};">${property.status}</span></p>
        ${property.status === 'Available' ? '<a href="#contact">Contact Us</a>' : ''}
      </div>
    `;
    listings.appendChild(card);
  });
}

function filterProperties(type) {
  if (type === 'All') {
    displayProperties(allProperties);
  } else {
    const filtered = allProperties.filter(p => p.type === type);
    displayProperties(filtered);
  }
}


