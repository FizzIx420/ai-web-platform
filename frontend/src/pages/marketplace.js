import { supabase } from '../supabaseConfig.js'; // Updated path
import { addToCart } from '../utils/cart';

export async function marketplacePage() {
  const { data: templates, error } = await supabase
    .from('templates')
    .select('*')
    .eq('approved', true);

  if (error) return `<p>Error loading templates</p>`;

  let html = `<h2>Template Marketplace</h2><div class="template-grid">`;

  templates.forEach(t => {
    html += `
      <div class="template-card">
        <img src="${t.preview_url || '/placeholder.png'}" alt="${t.title}" />
        <h3>${t.title}</h3>
        <p>${t.description.substring(0, 80)}...</p>
        <p class="price">$${t.price}</p>
        <button onclick="viewTemplate('${t.id}')">View Details</button>
        <button onclick="addToCart('${t.id}')">Add to Cart</button>
      </div>
    `;
  });

  html += `</div>`;
  return html;
}

window.viewTemplate = (id) => {
  window.location.hash = `template?id=${id}`;
};