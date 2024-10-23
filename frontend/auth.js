// Function to handle login
document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    
    // Dummy authentication (replace with Firebase authentication if needed)
    if (email === "user@example.com" && password === "password123") {
      alert("Login successful!");
      window.location.href = "dashboard.html"; // Redirect to dashboard
    } else {
      alert("Invalid email or password. Please try again.");
    }
  });
  
  // Function to handle registration
  document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();
  
    const name = document.getElementById("name").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;
  
    // Simple registration (replace with Firebase registration if needed)
    alert("Registration successful! Now you can log in.");
    window.location.href = "login.html"; // Redirect to login page
  });

  // Function to check if user is logged in before accessing profile, alerts, and settings
function checkAuthentication() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
  
    // Redirect to login page if user is not logged in
    if (!isLoggedIn || isLoggedIn === "false") {
      window.location.href = "login.html";
    }
  }
  
  // Call this function on each restricted page (profile, alerts, settings)
  window.onload = checkAuthentication;
  
  