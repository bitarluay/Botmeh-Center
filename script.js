fetch('properties.json')
  .then(response => response.json())
  .then(data => {
    const listings = document.getElementById('listings');

    data.forEach(property => {
      const card = document.createElement('div');
      card.classList.add('property');

      card.innerHTML = `
        <img src="${property.image}" alt="${property.name}">
        <div class="details">
          <h3>${property.name}</h3>
          <p>Type: ${property.type}</p>
          <p>Amenities: ${property.amenities.join(', ')}</p>
          <p>Status: <strong style="color:${property.status === 'Available' ? 'green' : 'red'}">${property.status}</strong></p>
          ${property.status === 'Available' ? '<a href="#contact">Contact Us</a>' : ''}
        </div>
      `;

      listings.appendChild(card);
    });
  })
  .catch(err => console.error('Error loading properties:', err));



