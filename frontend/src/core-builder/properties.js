import { getSelectedComponent, updateComponent } from './canvas.js';
import { componentSchemas } from './componentSchemas.js';

export function loadProperties(comp) {
  const panel = document.getElementById('properties-panel');
  if (!panel) return;

  const schema = componentSchemas[comp.type];
  if (!schema) return;

  let html = `<h3>Edit ${schema.label}</h3>`;
  html += `<div id="prop-fields"></div>`;
  html += `<hr /><button onclick="deleteSelected()" class="btn btn-danger">Delete</button>`;

  panel.innerHTML = html;

  const fieldsContainer = document.getElementById('prop-fields');

  // Generate inputs for each editable field
  schema.editableFields.forEach(field => {
    const value = getValueByPath(comp, field.path);
    const fieldId = `prop_${field.path.replace(/\./g, '_')}`;
    
    switch (field.type) {
      case 'text':
        fieldsContainer.innerHTML += `
          <label>${field.label}</label>
          <input type="text" id="${fieldId}" value="${value || ''}" />
        `;
        break;
      case 'color':
        fieldsContainer.innerHTML += `
          <label>${field.label}</label>
          <input type="color" id="${fieldId}" value="${value || '#6366f1'}" />
        `;
        break;
      case 'select':
        let options = field.options.map(opt => `<option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>`).join('');
        fieldsContainer.innerHTML += `
          <label>${field.label}</label>
          <select id="${fieldId}">${options}</select>
        `;
        break;
      case 'range':
        fieldsContainer.innerHTML += `
          <label>${field.label} <span id="${fieldId}_val">${value || 0}</span>${field.unit || ''}</label>
          <input type="range" id="${fieldId}" min="${field.min}" max="${field.max}" value="${value || 0}" step="1" />
        `;
        break;
    }
  });

  // Add listeners after DOM is updated
  setTimeout(() => {
    schema.editableFields.forEach(field => {
      const fieldId = `prop_${field.path.replace(/\./g, '_')}`;
      const input = document.getElementById(fieldId);
      if (!input) return;

      input.addEventListener('input', (e) => {
        const newComp = JSON.parse(JSON.stringify(comp));
        let val = e.target.value;
        if (field.type === 'range') {
          document.getElementById(fieldId + '_val').innerText = val;
          val += field.unit || '';
        }
        setValueByPath(newComp, field.path, val);
        updateComponent(newComp);
      });
    });
  }, 0);
}

// Helper to get nested value
function getValueByPath(obj, path) {
  return path.split('.').reduce((o, p) => o && o[p], obj);
}

// Helper to set nested value
function setValueByPath(obj, path, value) {
  const parts = path.split('.');
  const last = parts.pop();
  const target = parts.reduce((o, p) => o[p] = o[p] || {}, obj);
  target[last] = value;
}

window.deleteSelected = () => {
  // Implementation in canvas.js – we'll call a global function
  if (window.deleteSelectedComponent) window.deleteSelectedComponent();
};