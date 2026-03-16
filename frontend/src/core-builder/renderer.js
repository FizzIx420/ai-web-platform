import { componentSchemas } from './componentSchemas.js';

export function renderComponent(comp) {
  const schema = componentSchemas[comp.type];
  if (!schema) return document.createElement('div');

  const { content, styles } = comp;
  
  // 1. OUTER WRAPPER (Handles the boundary limits and border highlighting)
  const wrapper = document.createElement('div');
  wrapper.className = `builder-component type-${comp.type}`;
  wrapper.style.overflow = 'hidden'; 
  
  // 2. INNER SCALER (Handles the relative zooming of the content)
  // Fallback to 800 width if older components don't have a baseWidth saved
  const safeBaseWidth = comp.baseWidth || 800; 
  const safeBaseHeight = comp.baseHeight || 350;
  const scaleRatio = comp.width / safeBaseWidth;

  const inner = document.createElement('div');
  Object.assign(inner.style, styles.container); // Apply user styles first
  
  // Enforce the scale overrides
  inner.style.transform = `scale(${scaleRatio})`;
  inner.style.transformOrigin = 'top left';
  inner.style.width = safeBaseWidth + 'px';
  inner.style.height = safeBaseHeight + 'px';
  inner.style.position = 'relative';

  switch (comp.type) {
    case 'hero':
      inner.innerHTML = `
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
      inner.innerHTML = `
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
      inner.innerHTML = `
        <h2 contenteditable="true" style="${styleToString(styles.title)}">${content.title}</h2>
        <div style="${styleToString(styles.planGrid)}">${plansHtml}</div>
      `;
      break;
    case 'contact':
      inner.innerHTML = `
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
      inner.innerHTML = `
        <h2 contenteditable="true" style="${styleToString(styles.title)}">${content.title}</h2>
        <div style="${styleToString(styles.grid)}">${imagesHtml}</div>
      `;
      break;
  }

  wrapper.appendChild(inner);
  return wrapper;
}

function styleToString(styleObj) {
  if (!styleObj) return '';
  return Object.entries(styleObj).map(([key, val]) => {
    const kebabKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
    return `${kebabKey}: ${val}`;
  }).join('; ');
}