import { componentSchemas } from './componentSchemas';

export function renderComponent(comp) {
  const schema = componentSchemas[comp.type];
  if (!schema) return document.createElement('div');

  const { content, styles } = comp;
  const container = document.createElement('div');
  container.className = `builder-component type-${comp.type}`;

  // Apply container styles
  Object.assign(container.style, styles.container);

  // Build inner HTML based on type
  switch (comp.type) {
    case 'hero':
      container.innerHTML = `
        <h1 style="${styleToString(styles.title)}">${content.title}</h1>
        <p style="${styleToString(styles.subtitle)}">${content.subtitle}</p>
        <button style="${styleToString(styles.button)}">${content.buttonText}</button>
      `;
      break;
    case 'features':
      let featuresHtml = '';
      content.features.forEach(f => {
        featuresHtml += `
          <div style="${styleToString(styles.featureCard)}">
            <div style="${styleToString(styles.featureIcon)}">${f.icon}</div>
            <h3 style="${styleToString(styles.featureTitle)}">${f.title}</h3>
            <p style="${styleToString(styles.featureDesc)}">${f.description}</p>
          </div>
        `;
      });
      container.innerHTML = `
        <h2 style="${styleToString(styles.title)}">${content.title}</h2>
        <div style="${styleToString(styles.featureGrid)}">
          ${featuresHtml}
        </div>
      `;
      break;
    case 'pricing':
      let plansHtml = '';
      content.plans.forEach(p => {
        let featuresList = p.features.map(f => `<li>${f}</li>`).join('');
        plansHtml += `
          <div style="${styleToString(styles.planCard)}">
            <h3 style="${styleToString(styles.planName)}">${p.name}</h3>
            <div style="${styleToString(styles.planPrice)}">${p.price}</div>
            <p style="${styleToString(styles.planDesc)}">${p.description}</p>
            <ul style="${styleToString(styles.planFeatures)}">${featuresList}</ul>
          </div>
        `;
      });
      container.innerHTML = `
        <h2 style="${styleToString(styles.title)}">${content.title}</h2>
        <div style="${styleToString(styles.planGrid)}">
          ${plansHtml}
        </div>
      `;
      break;
    case 'contact':
      container.innerHTML = `
        <h2 style="${styleToString(styles.title)}">${content.title}</h2>
        <form style="${styleToString(styles.form)}">
          <input type="text" placeholder="${content.namePlaceholder}" style="${styleToString(styles.input)}" />
          <input type="email" placeholder="${content.emailPlaceholder}" style="${styleToString(styles.input)}" />
          <textarea placeholder="${content.messagePlaceholder}" style="${styleToString(styles.input)}"></textarea>
          <button type="submit" style="${styleToString(styles.button)}">${content.buttonText}</button>
        </form>
      `;
      break;
    case 'gallery':
      let imagesHtml = '';
      content.images.forEach(img => {
        imagesHtml += `<img src="${img.src}" alt="${img.alt}" style="${styleToString(styles.image)}" />`;
      });
      container.innerHTML = `
        <h2 style="${styleToString(styles.title)}">${content.title}</h2>
        <div style="${styleToString(styles.grid)}">
          ${imagesHtml}
        </div>
      `;
      break;
    default:
      container.innerHTML = '<p>Unknown component</p>';
  }

  return container;
}

function styleToString(styleObj) {
  return Object.entries(styleObj).map(([key, val]) => `${key}: ${val}`).join('; ');
}