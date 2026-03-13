import { supabase } from '../utils/supabase';
import { getCart, clearCart } from '../utils/cart';

export function checkoutPage(user) {
  const cart = getCart();
  if (cart.length === 0) {
    window.location.hash = 'cart';
    return '';
  }

  return `
    <h2>Checkout</h2>
    <p>You are about to purchase ${cart.length} template(s).</p>
    <p>Select payment method:</p>
    <select id="paymentMethod">
      <option value="JazzCash">JazzCash</option>
      <option value="EasyPaisa">EasyPaisa</option>
      <option value="Bank Transfer">Bank Transfer</option>
    </select>
    <p>Enter transaction ID / receipt number after payment:</p>
    <input type="text" id="transactionId" placeholder="Transaction ID" />
    <button onclick="submitOrder('${user.id}')">Submit Order</button>
  `;
}

window.submitOrder = async (userId) => {
  const cart = getCart();
  const paymentMethod = document.getElementById('paymentMethod').value;
  const transactionId = document.getElementById('transactionId').value;

  if (!transactionId) {
    alert('Please enter transaction ID');
    return;
  }

  // Create an order for each template (or a single order with multiple items)
  for (const templateId of cart) {
    const { error } = await supabase
      .from('orders')
      .insert({
        user_id: userId,
        template_id: templateId,
        payment_method: paymentMethod,
        transaction_id: transactionId,
        payment_status: 'pending'
      });
    if (error) {
      alert('Error placing order: ' + error.message);
      return;
    }
  }

  clearCart();
  alert('Order placed! Admin will verify your payment soon.');
  window.location.hash = 'dashboard';
};