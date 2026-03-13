import './styles/main.css';
import { loadRoute } from './router';
import { supabase } from './utils/supabase.js';

// Check authentication status
async function init() {
  const { data: { session } } = await supabase.auth.getSession();
  const hash = window.location.hash.slice(1) || 'home';
  const app = document.getElementById('app');
  app.innerHTML = await loadRoute(hash, session);
}

window.addEventListener('hashchange', init);
init();