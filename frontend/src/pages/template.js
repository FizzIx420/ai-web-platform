import { supabase } from '../utils/supabase';
import { addToCart } from '../utils/cart';

export async function templatePage(id) {
  const { data: template, error } = await supabase
    .from('templates')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !template) return `<p>Template not found</p>`;

  // Load reviews
  const { data: reviews } = await supabase
    .from('reviews')
    .select('*, users(full_name)')
    .eq('template_id', id);

  let reviewsHtml = '';
  if (reviews) {
    reviews.forEach(r => {
      reviewsHtml += `
        <div class="review">
          <strong>${r.users?.full_name || 'Anonymous'}</strong> - ⭐${r.rating}
          <p>${r.comment}</p>
        </div>
      `;
    });
  }

  return `
    <div class="template-detail">
      <h2>${template.title}</h2>
      <img src="${template.preview_url}" alt="${template.title}" style="max-width:100%" />
      <p>${template.description}</p>
      <p class="price">$${template.price}</p>
      <a href="${template.preview_url}" target="_blank">Live Preview</a>
      <button onclick="addToCart('${template.id}')">Add to Cart</button>
      <button onclick="buyNow('${template.id}')">Buy Now</button>

      <hr />
      <h3>Reviews</h3>
      ${reviewsHtml || '<p>No reviews yet.</p>'}
      <textarea id="reviewComment" placeholder="Your review"></textarea>
      <select id="reviewRating">
        <option value="5">5</option>
        <option value="4">4</option>
        <option value="3">3</option>
        <option value="2">2</option>
        <option value="1">1</option>
      </select>
      <button onclick="submitReview('${template.id}')">Submit Review</button>
    </div>
  `;
}

window.buyNow = (id) => {
  addToCart(id);
  window.location.hash = 'checkout';
};

window.submitReview = async (templateId) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return alert('Please login first');

  const comment = document.getElementById('reviewComment').value;
  const rating = document.getElementById('reviewRating').value;

  const { error } = await supabase
    .from('reviews')
    .insert({
      template_id: templateId,
      user_id: user.id,
      rating,
      comment
    });

  if (error) alert(error.message);
  else {
    alert('Review submitted');
    window.location.reload();
  }
};