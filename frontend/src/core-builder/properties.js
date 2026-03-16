import { getSelectedComponent, updateComponent } from './canvas.js';
import { componentSchemas } from './componentSchemas.js';

export function loadProperties(comp) {
  const panel = document.getElementById('properties-panel');
  if (!panel) return;

  const schema = componentSchemas[comp.type];
  if (!schema) return;

  let html = `<h3>Edit ${schema.label}</h3>`;
  html += `<div id="prop-fields"></div>`;
  html += `<hr /><button onclick="deleteSelectedComponent()" style="background:#ef4444; color:white;">Delete Component</button>`;

  panel.innerHTML = html;
  const fieldsContainer = document.getElementById('prop-fields');

  // Generate inputs
  schema.editableFields.forEach(field => {
    const value = getValueByPath(comp, field.path) || '';
    const fieldId = `prop_${field.path.replace(/\./g, '_')}`;
    
    if (field.type === 'text') {
      fieldsContainer.innerHTML += `<label>${field.label}</label><input type="text" id="${fieldId}" value="${value}" />`;
    } else if (field.type === 'color') {
      fieldsContainer.innerHTML += `<label>${field.label}</label><input type="color" id="${fieldId}" value="${value}" />`;
    } else if (field.type === 'select') {
      let options = field.options.map(opt => `<option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>`).join('');
      fieldsContainer.innerHTML += `<label>${field.label}</label><select id="${fieldId}">${options}</select>`;
    } else if (field.type === 'number') {
      // Strip out 'px' for the input field display
      const numVal = typeof value === 'string' ? value.replace('px', '') : value;
      fieldsContainer.innerHTML += `<label>${field.label} (${field.unit || ''})</label><input type="number" id="${fieldId}" min="${field.min}" max="${field.max}" value="${numVal}" />`;
    }
  });

  // Attach event listeners safely
  setTimeout(() => {
    schema.editableFields.forEach(field => {
      const fieldId = `prop_${field.path.replace(/\./g, '_')}`;
      const input = document.getElementById(fieldId);
      if (!input) return;

      input.addEventListener('input', (e) => {
        const newComp = JSON.parse(JSON.stringify(getSelectedComponent())); 
        let val = e.target.value;
        if (field.type === 'number') val += (field.unit || '');
        setValueByPath(newComp, field.path, val);
        
        // THE FIX: Pass 'false' so the properties panel doesn't destroy itself while typing!
        updateComponent(newComp, false); 
      });
    });
  }, 0);
}

function getValueByPath(obj, path) {
  return path.split('.').reduce((o, p) => o && o[p], obj);
}

function setValueByPath(obj, path, value) {
  const parts = path.split('.');
  const last = parts.pop();
  const target = parts.reduce((o, p) => o[p] = o[p] || {}, obj);
  target[last] = value;
}