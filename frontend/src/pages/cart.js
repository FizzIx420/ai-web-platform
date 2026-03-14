import { supabase } from '../supabaseConfig.js';
import { getCart, removeFromCart, clearCart } from '../utils/cart';

export async function cartPage() {
  const cartIds = getCart();
  if (cartIds.length === 0) return `<h2>Your cart is empty</h2>`;

  const { data: templates } = await supabase
    .from('templates')
    .select('*')
    .in('id', cartIds);

  let total = 0;
  let html = `<h2>Shopping Cart</h2><ul>`;

  templates.forEach(t => {
    total += t.price;
    html += `
      <li>
        ${t.title} - $${t.price}
        <button onclick="removeItem('${t.id}')">Remove</button>
      </li>
    `;
  });

  html += `</ul><p><strong>Total: $${total}</strong></p>`;
  html += `<button onclick="proceedToCheckout()">Proceed to Checkout</button>`;
  return html;
}

window.removeItem = (id) => {
  removeFromCart(id);
  window.location.reload();
};

window.proceedToCheckout = () => {
  window.location.hash = 'checkout';
};