import { supabase } from '../supabaseConfig.js'; 

export function registerPage() {
  return `
    <div class="auth-container">
      <h2>Create Account</h2>
      <input type="text" id="name" placeholder="Full Name" />
      <input type="email" id="email" placeholder="Email" />
      <input type="password" id="password" placeholder="Password" />
      <button onclick="handleRegister()">Register</button>
      <p>Already have an account? <a href="#login">Login</a></p>
    </div>
  `;
}

window.handleRegister = async () => {
  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name } }
  });

  if (error) alert(error.message);
  else {
    alert('Check your email for verification link!');
    window.location.hash = 'login';
  }
};