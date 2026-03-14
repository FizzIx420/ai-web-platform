import { supabase } from '../supabaseConfig.js'; // Updated path

export function loginPage() {
  return `
    <div class="auth-container">
      <h2>Login</h2>
      <input type="email" id="email" placeholder="Email" />
      <input type="password" id="password" placeholder="Password" />
      <button onclick="handleLogin()">Login</button>
      <p>Don't have an account? <a href="#register">Register</a></p>
      <p><a href="#forgot-password">Forgot password?</a></p>
    </div>
  `;
}

window.handleLogin = async () => {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const { error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) alert(error.message);
  else window.location.hash = 'dashboard';
};