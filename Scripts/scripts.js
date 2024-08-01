
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');
  console.log(loginForm)

  if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          // Your code to handle form submission

          const email = document.getElementById('username-id').value;
          const password = document.getElementById('password-id').value;
          console.log(email, password)

        try {
          const response = await fetch('http://127.0.0.1:5000/login', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({email, password })
          });
          if (response.ok) {
              const data = await response.json();
              document.cookie = `token=${data.access_token}; path=/`;
              window.location.href = 'index.html';
          } else {
            alert('Login failed: ' + response.statusText);
          }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }   
      }); 
    }
    checkAuthentication();
});

function checkAuthentication() {
  const token = getCookie('token');
  const loginLink = document.getElementById('login-link');

  if (!token) {
      loginLink.style.display = 'block';
  } else {
      loginLink.style.display = 'none';
      // Fetch places data if the user is authenticated
      fetchPlaces();
  }
}
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

async function fetchPlaces() {
  try {
    const response = await fetch('http://127.0.0.1:5000/places', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
    });

    if (response.ok) {
      const places = await response.json();
      displayPlaces(places)
    } else [
      console.error('Error:', error),
      alert('Failed to load places', response.statusText)
    ]
  } catch {
      console.error('Error:', error);
  }
}

function displayPlaces(places) {
  const pList = document.getElementById('row');
  pList.innerHTML = ``;

  places.forEach(place => {
    const pElement = document.createElement('li');
    pElement.innerHTML = `
      <li class="place-card">
          <div class="place">
              <h2 class="place-name">${place.id}</h2>
              <img src="404image" alt="image"/>
              <p id="price">Price per night: ${place.price_per_night}</p>
              <p id="location">Location: ${place.city_name}, ${place.country_name}</p>
              <a href="place.html"><button class="details-button">View Details</button></a>    
          </div>
      </li>
    `;
    pList.appendChild(pElement);
  });
}