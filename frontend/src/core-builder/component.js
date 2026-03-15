export const components = {
  hero: `
    <section class="hero" style="background:#4f46e5; color:white; padding:80px 20px; text-align:center; position:relative;">
      <h1 data-editable="title" style="font-size:2.5rem; margin-bottom:1rem;">Hero Title</h1>
      <p data-editable="subtitle" style="font-size:1.2rem; margin-bottom:2rem;">Hero description goes here</p>
      <button data-editable="button" style="background:white; color:#4f46e5; border:none; padding:10px 30px; border-radius:5px; font-weight:bold;">Learn More</button>
    </section>
  `,
  features: `
    <section class="features" style="padding:60px 20px; background:#f9fafb; position:relative;">
      <h2 data-editable="title" style="text-align:center; margin-bottom:3rem;">Features</h2>
      <div style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap;">
        <div data-editable="feature1" style="flex:1; min-width:200px; text-align:center;">
          <h3>Feature 1</h3>
          <p>Description of feature 1</p>
        </div>
        <div data-editable="feature2" style="flex:1; min-width:200px; text-align:center;">
          <h3>Feature 2</h3>
          <p>Description of feature 2</p>
        </div>
        <div data-editable="feature3" style="flex:1; min-width:200px; text-align:center;">
          <h3>Feature 3</h3>
          <p>Description of feature 3</p>
        </div>
      </div>
    </section>
  `,
  pricing: `
    <section class="pricing" style="padding:60px 20px; background:white; position:relative;">
      <h2 data-editable="title" style="text-align:center; margin-bottom:3rem;">Pricing Plans</h2>
      <div style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap;">
        <div data-editable="plan1" style="border:1px solid #ddd; padding:30px; border-radius:10px; min-width:250px;">
          <h3>Basic</h3>
          <p data-editable="price1">$29</p>
          <p data-editable="desc1">Ideal for individuals</p>
        </div>
        <div data-editable="plan2" style="border:1px solid #ddd; padding:30px; border-radius:10px; min-width:250px; background:#f0f0f0;">
          <h3>Pro</h3>
          <p data-editable="price2">$59</p>
          <p data-editable="desc2">For growing teams</p>
        </div>
      </div>
    </section>
  `,
  contact: `
    <section class="contact" style="padding:60px 20px; background:#f3f4f6; position:relative;">
      <h2 data-editable="title" style="text-align:center; margin-bottom:2rem;">Contact Us</h2>
      <form style="max-width:400px; margin:0 auto;">
        <input data-editable="namePlaceholder" placeholder="Your Name" style="width:100%; margin:10px 0; padding:10px;" />
        <input data-editable="emailPlaceholder" placeholder="Your Email" style="width:100%; margin:10px 0; padding:10px;" />
        <textarea data-editable="messagePlaceholder" placeholder="Your Message" style="width:100%; margin:10px 0; padding:10px;"></textarea>
        <button data-editable="button" style="background:#4f46e5; color:white; border:none; padding:10px; width:100%;">Send Message</button>
      </form>
    </section>
  `,
  gallery: `
    <section class="gallery" style="padding:60px 20px; position:relative;">
      <h2 data-editable="title" style="text-align:center; margin-bottom:2rem;">Gallery</h2>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px;">
        <img data-editable="img1" src="https://via.placeholder.com/300" style="width:100%;" />
        <img data-editable="img2" src="https://via.placeholder.com/300" style="width:100%;" />
        <img data-editable="img3" src="https://via.placeholder.com/300" style="width:100%;" />
      </div>
    </section>
  `
};