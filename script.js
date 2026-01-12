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
  if (!listings) return;
  
  listings.innerHTML = '';
  listings.classList.add('listings-grid');
  
  if (properties.length === 0) {
    listings.innerHTML = '<p style="text-align:center; color:#666; font-size:1.2em;">No properties found.</p>';
    return;
  }
  
  properties.forEach(property => {
    const card = document.createElement('div');
    card.classList.add('property');
    
    const amenitiesTags = property.amenities.map(a => 
      `<span class="amenity-tag">${a}</span>`
    ).join('');
    
    const badgeClass = property.status === 'Available' ? 'badge-available' : 'badge-occupied';
    
    card.innerHTML = `
      <div class="property-image-container">
        <span class="property-badge ${badgeClass}">${property.status}</span>
        <img src="${property.image}" alt="${property.name}" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23e5e7eb%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%239ca3af%22 font-family=%22sans-serif%22 font-size=%2220%22 dy=%2210.5%22 font-weight=%22bold%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22%3E${property.name}%3C/text%3E%3C/svg%3E'">
      </div>
      <div class="details">
        <h3>${property.name}</h3>
        <p><strong>Type:</strong> ${property.type}</p>
        <div class="amenities-list">
          ${amenitiesTags}
        </div>
        ${property.status === 'Available' ? '<a href="index.html#contact">Contact Us</a>' : ''}
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

// Contact form property selection
const propertyType = document.getElementById('propertyType');
const propertyNumberContainer = document.getElementById('propertyNumberContainer');
const propertyNumber = document.getElementById('propertyNumber');

if (propertyType) {
  propertyType.addEventListener('change', function() {
    const selected = this.value;
    propertyNumber.innerHTML = '<option value="">Select a property</option>';
    
    if (selected === 'apartment') {
      // Fetch available apartments only
      fetch('properties.json')
        .then(response => response.json())
        .then(data => {
          const availableApartments = data.filter(p => p.type === 'Apartment' && p.status === 'Available');
          
          if (availableApartments.length > 0) {
            propertyNumberContainer.style.display = 'block';
            availableApartments.forEach(apt => {
              const option = document.createElement('option');
              option.value = apt.name;
              option.textContent = apt.name;
              propertyNumber.appendChild(option);
            });
          } else {
            propertyNumberContainer.style.display = 'none';
            alert('Sorry, no apartments are currently available. Please check back later or contact us for future availability.');
          }
        })
        .catch(err => {
          console.error('Error loading properties:', err);
          propertyNumberContainer.style.display = 'none';
        });
        
    } else if (selected === 'retail') {
      // Fetch available retail stores only
      fetch('properties.json')
        .then(response => response.json())
        .then(data => {
          const availableRetail = data.filter(p => p.type === 'Retail Store' && p.status === 'Available');
          
          if (availableRetail.length > 0) {
            propertyNumberContainer.style.display = 'block';
            availableRetail.forEach(store => {
              const option = document.createElement('option');
              option.value = store.name;
              option.textContent = store.name;
              propertyNumber.appendChild(option);
            });
          } else {
            propertyNumberContainer.style.display = 'none';
            alert('Sorry, no retail stores are currently available. Please check back later or contact us for future availability.');
          }
        })
        .catch(err => {
          console.error('Error loading properties:', err);
          propertyNumberContainer.style.display = 'none';
        });
        
    } else if (selected === 'gas_station') {
      propertyNumberContainer.style.display = 'none';
    } else {
      propertyNumberContainer.style.display = 'none';
    }
  });
}
