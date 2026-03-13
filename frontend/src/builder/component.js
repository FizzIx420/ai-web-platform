export const components = {
  hero: `
    <section class="hero" style="background:#4f46e5; color:white; padding:80px 20px; text-align:center;">
      <h1>Hero Title</h1>
      <p>Hero description goes here</p>
      <button>Learn More</button>
    </section>
  `,
  features: `
    <section class="features" style="padding:60px 20px;">
      <h2 style="text-align:center;">Features</h2>
      <div style="display:flex; gap:20px;">
        <div>Feature 1</div>
        <div>Feature 2</div>
        <div>Feature 3</div>
      </div>
    </section>
  `,
  pricing: `
    <section class="pricing" style="padding:60px 20px; background:#f9fafb;">
      <h2 style="text-align:center;">Pricing</h2>
      <div style="display:flex; justify-content:center; gap:20px;">
        <div>Basic $29</div>
        <div>Pro $59</div>
      </div>
    </section>
  `,
  contact: `
    <section class="contact" style="padding:60px 20px;">
      <h2 style="text-align:center;">Contact</h2>
      <form style="max-width:400px; margin:0 auto;">
        <input placeholder="Name" /><br/>
        <input placeholder="Email" /><br/>
        <textarea placeholder="Message"></textarea><br/>
        <button>Send</button>
      </form>
    </section>
  `,
  gallery: `
    <section class="gallery" style="padding:60px 20px;">
      <h2>Gallery</h2>
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:10px;">
        <img src="/placeholder.png" />
        <img src="/placeholder.png" />
        <img src="/placeholder.png" />
      </div>
    </section>
  `
};