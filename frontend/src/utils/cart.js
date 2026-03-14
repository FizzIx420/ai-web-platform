export function addToCart(templateId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (!cart.includes(templateId)) {
    cart.push(templateId);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Added to cart');
  } else {
    alert('Already in cart');
  }
}

export function removeFromCart(templateId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(id => id !== templateId);
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

export function clearCart() {
  localStorage.removeItem('cart');
}