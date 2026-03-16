import { componentSchemas } from './componentSchemas.js';

export function renderComponent(comp) {
  const schema = componentSchemas[comp.type];
  if (!schema) return document.createElement('div');

  const { content, styles } = comp;
  const container = document.createElement('div');
  container.className = `builder-component type-${comp.type}`;
  
  // Applies true styling directly to the boundary box!
  Object.assign(container.style, styles.container);
  
  // Force internal dimensions to exactly match the resize wrapper
  container.style.width = '100%';
  container.style.height = '100%';
  container.style.overflow = 'hidden'; 

  switch (comp.type) {
    case 'hero':
      container.innerHTML = `
        <h1 contenteditable="true" onblur="window.updateText('${comp.id}', 'content.title', this.innerText)" style="${styleToString(styles.title)}">${content.title}</h1>
        <p contenteditable="true" onblur="window.updateText('${comp.id}', 'content.subtitle', this.innerText)" style="${styleToString(styles.subtitle)}">${content.subtitle}</p>
        <button contenteditable="true" onblur="window.updateText('${comp.id}', 'content.buttonText', this.innerText)" onclick="event.preventDefault()" style="${styleToString(styles.button)}">${content.buttonText}</button>
      `;
      break;
    case 'features':
      let featuresHtml = '';
      content.features.forEach((f, i) => {
        featuresHtml += `
          <div style="${styleToString(styles.featureCard)}">
            <div contenteditable="true" onblur="window.updateText('${comp.id}', 'content.features.${i}.icon', this.innerText)" style="${styleToString(styles.featureIcon)}">${f.icon}</div>
            <h3 contenteditable="true" onblur="window.updateText('${comp.id}', 'content.features.${i}.title', this.innerText)" style="${styleToString(styles.featureTitle)}">${f.title}</h3>
            <p contenteditable="true" onblur="window.updateText('${comp.id}', 'content.features.${i}.description', this.innerText)" style="${styleToString(styles.featureDesc)}">${f.description}</p>
          </div>
        `;
      });
      container.innerHTML = `
        <h2 contenteditable="true" onblur="window.updateText('${comp.id}', 'content.title', this.innerText)" style="${styleToString(styles.title)}">${content.title}</h2>
        <div style="${styleToString(styles.featureGrid)}">${featuresHtml}</div>
      `;
      break;
    case 'pricing':
      let plansHtml = '';
      content.plans.forEach((p, i) => {
        let featuresList = p.features.map((f, j) => `<li contenteditable="true" onblur="window.updateText('${comp.id}', 'content.plans.${i}.features.${j}', this.innerText)">${f}</li>`).join('');
        plansHtml += `
          <div style="${styleToString(styles.planCard)}">
            <h3 contenteditable="true" onblur="window.updateText('${comp.id}', 'content.plans.${i}.name', this.innerText)" style="${styleToString(styles.planName)}">${p.name}</h3>
            <div contenteditable="true" onblur="window.updateText('${comp.id}', 'content.plans.${i}.price', this.innerText)" style="${styleToString(styles.planPrice)}">${p.price}</div>
            <p contenteditable="true" onblur="window.updateText('${comp.id}', 'content.plans.${i}.description', this.innerText)" style="${styleToString(styles.planDesc)}">${p.description}</p>
            <ul style="${styleToString(styles.planFeatures)}">${featuresList}</ul>
          </div>
        `;
      });
      container.innerHTML = `
        <h2 contenteditable="true" onblur="window.updateText('${comp.id}', 'content.title', this.innerText)" style="${styleToString(styles.title)}">${content.title}</h2>
        <div style="${styleToString(styles.planGrid)}">${plansHtml}</div>
      `;
      break;
    case 'contact':
      container.innerHTML = `
        <h2 contenteditable="true" onblur="window.updateText('${comp.id}', 'content.title', this.innerText)" style="${styleToString(styles.title)}">${content.title}</h2>
        <form style="${styleToString(styles.form)}" onsubmit="event.preventDefault()">
          <input type="text" placeholder="${content.namePlaceholder}" onblur="window.updateText('${comp.id}', 'content.namePlaceholder', this.value)" style="${styleToString(styles.input)}" />
          <input type="email" placeholder="${content.emailPlaceholder}" onblur="window.updateText('${comp.id}', 'content.emailPlaceholder', this.value)" style="${styleToString(styles.input)}" />
          <textarea placeholder="${content.messagePlaceholder}" onblur="window.updateText('${comp.id}', 'content.messagePlaceholder', this.value)" style="${styleToString(styles.input)}"></textarea>
          <button contenteditable="true" onblur="window.updateText('${comp.id}', 'content.buttonText', this.innerText)" type="button" style="${styleToString(styles.button)}">${content.buttonText}</button>
        </form>
      `;
      break;
    case 'gallery':
      let imagesHtml = '';
      content.images.forEach((img, i) => {
        // For gallery images, we let them edit the SRC URL directly via properties panel, not via click
        imagesHtml += `<img src="${img.src}" alt="${img.alt}" style="${styleToString(styles.image)}" />`;
      });
      container.innerHTML = `
        <h2 contenteditable="true" onblur="window.updateText('${comp.id}', 'content.title', this.innerText)" style="${styleToString(styles.title)}">${content.title}</h2>
        <div style="${styleToString(styles.grid)}">${imagesHtml}</div>
      `;
      break;
  }
  return container;
}

function styleToString(styleObj) {
  if (!styleObj) return '';
  return Object.entries(styleObj).map(([key, val]) => {
    // Specifically handle background image URLs
    if (key === 'backgroundImage' && val) return `background-image: url('${val}')`;
    const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    return `${kebabKey}: ${val}`;
  }).join('; ');
}