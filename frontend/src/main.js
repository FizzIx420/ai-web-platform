import './styles/main.css';
import { loadRoute } from './router';
<<<<<<< HEAD
import { supabase } from './supabaseConfig.js'; // Updated path
=======
import { supabase } from './utils/supabase.js';
>>>>>>> f9c567dba76960c4db5d906804cb593c2cd69c2a

// Check authentication status
async function init() {
  const { data: { session } } = await supabase.auth.getSession();
  const hash = window.location.hash.slice(1) || 'home';
  const app = document.getElementById('app');
  app.innerHTML = await loadRoute(hash, session);
}

window.addEventListener('hashchange', init);
init();