
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('login-form');

  if (loginForm) {
      loginForm.addEventListener('submit', async (event) => {
          event.preventDefault();
          // Your code to handle form submission

          const email = document.querySelector('email');
          const password = document.querySelector('password');

          if (email === 'admin' && password === 'password'){
            loginUser(email, password);
          } 
      });
  }
});

async function loginUser(email, password) {
  const response = await fetch('https://127.0.0.1:5000/login', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
  });
  
  if (response.ok) {
      const data = await response.json();
      document.cookie = `token=${data.access_token}; path=/`;
      window.location.href = 'index.html';
  } else {
    alert('Login failed: ' + response.statusText);
  }
}



