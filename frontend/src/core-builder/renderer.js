import { componentSchemas } from './componentSchemas.js';

export function renderComponent(comp) {
  const schema = componentSchemas[comp.type];
  if (!schema) return document.createElement('div');

  const { content, styles } = comp;
  const container = document.createElement('div');
  container.className = `builder-component type-${comp.type}`;
  Object.assign(container.style, styles.container);

  switch (comp.type) {
    case 'hero':
      container.innerHTML = `
        <h1 contenteditable="true" style="${styleToString(styles.title)}">${content.title}</h1>
        <p contenteditable="true" style="${styleToString(styles.subtitle)}">${content.subtitle}</p>
        <button contenteditable="true" onclick="event.preventDefault()" style="${styleToString(styles.button)}">${content.buttonText}</button>
      `;
      break;
    case 'features':
      let featuresHtml = '';
      content.features.forEach(f => {
        featuresHtml += `
          <div style="${styleToString(styles.featureCard)}">
            <div contenteditable="true" style="${styleToString(styles.featureIcon)}">${f.icon}</div>
            <h3 contenteditable="true" style="${styleToString(styles.featureTitle)}">${f.title}</h3>
            <p contenteditable="true" style="${styleToString(styles.featureDesc)}">${f.description}</p>
          </div>
        `;
      });
      container.innerHTML = `
        <h2 contenteditable="true" style="${styleToString(styles.title)}">${content.title}</h2>
        <div style="${styleToString(styles.featureGrid)}">${featuresHtml}</div>
      `;
      break;
    case 'pricing':
      let plansHtml = '';
      content.plans.forEach(p => {
        let featuresList = p.features.map(f => `<li contenteditable="true">${f}</li>`).join('');
        plansHtml += `
          <div style="${styleToString(styles.planCard)}">
            <h3 contenteditable="true" style="${styleToString(styles.planName)}">${p.name}</h3>
            <div contenteditable="true" style="${styleToString(styles.planPrice)}">${p.price}</div>
            <p contenteditable="true" style="${styleToString(styles.planDesc)}">${p.description}</p>
            <ul style="${styleToString(styles.planFeatures)}">${featuresList}</ul>
          </div>
        `;
      });
      container.innerHTML = `
        <h2 contenteditable="true" style="${styleToString(styles.title)}">${content.title}</h2>
        <div style="${styleToString(styles.planGrid)}">${plansHtml}</div>
      `;
      break;
    case 'contact':
      container.innerHTML = `
        <h2 contenteditable="true" style="${styleToString(styles.title)}">${content.title}</h2>
        <form style="${styleToString(styles.form)}" onsubmit="event.preventDefault()">
          <input type="text" placeholder="${content.namePlaceholder}" style="${styleToString(styles.input)}" />
          <input type="email" placeholder="${content.emailPlaceholder}" style="${styleToString(styles.input)}" />
          <textarea placeholder="${content.messagePlaceholder}" style="${styleToString(styles.input)}"></textarea>
          <button contenteditable="true" type="button" style="${styleToString(styles.button)}">${content.buttonText}</button>
        </form>
      `;
      break;
    case 'gallery':
      let imagesHtml = '';
      content.images.forEach(img => {
        imagesHtml += `<img src="${img.src}" alt="${img.alt}" style="${styleToString(styles.image)}" />`;
      });
      container.innerHTML = `
        <h2 contenteditable="true" style="${styleToString(styles.title)}">${content.title}</h2>
        <div style="${styleToString(styles.grid)}">${imagesHtml}</div>
      `;
      break;
  }
  return container;
}

function styleToString(styleObj) {
  if (!styleObj) return '';
  return Object.entries(styleObj).map(([key, val]) => {
    const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    return `${kebabKey}: ${val}`;
  }).join('; ');
}