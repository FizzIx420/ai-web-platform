import { getSelectedComponent, updateComponent } from './canvas.js';
import { componentSchemas } from './componentSchemas.js';

export function loadProperties(comp) {
  const panel = document.getElementById('properties-panel');
  if (!panel) return;

  // IF NOTHING IS SELECTED, SHOW CANVAS SETTINGS
  if (!comp) {
    panel.innerHTML = `
      <h3>Canvas Settings</h3>
      <p style="color:#64748b; font-size:0.9rem; margin-bottom:1rem;">Click a component to edit it, or change the workspace below.</p>
      
      <label>Canvas Background Color</label>
      <input type="color" onchange="document.getElementById('canvas').style.backgroundColor = this.value" value="#f8fafc" style="width:100%; height:40px; margin-bottom:1rem; cursor:pointer;" />
      
      <label>Canvas Image (URL)</label>
      <input type="text" placeholder="https://images.unsplash.com/..." onchange="document.getElementById('canvas').style.backgroundImage = 'url(' + this.value + ')'" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:4px; margin-bottom:1rem;" />
      
      <label>Canvas Size</label>
      <select onchange="document.getElementById('canvas').style.backgroundSize = this.value" style="width:100%; padding:8px; border:1px solid #cbd5e1; border-radius:4px;">
        <option value="cover">Cover</option>
        <option value="contain">Contain</option>
        <option value="repeat">Repeat Pattern</option>
      </select>
    `;
    return;
  }

  const schema = componentSchemas[comp.type];
  if (!schema) return;

  let html = `<h3>Edit ${schema.label}</h3>`;
  html += `<div id="prop-fields"></div>`;
  html += `<hr /><button onclick="deleteSelectedComponent()" style="background:#ef4444; color:white; padding:10px; width:100%; border:none; border-radius:6px; font-weight:bold; cursor:pointer;">Delete Component</button>`;

  panel.innerHTML = html;
  const fieldsContainer = document.getElementById('prop-fields');

  schema.editableFields.forEach(field => {
    const value = getValueByPath(comp, field.path) || '';
    const fieldId = `prop_${field.path.replace(/\./g, '_')}`;
    
    if (field.type === 'text') {
      fieldsContainer.innerHTML += `<label style="display:block; margin-top:10px; font-size:0.9rem; font-weight:600;">${field.label}</label><input type="text" id="${fieldId}" value="${value}" style="width:100%; padding:8px; margin-top:4px; border:1px solid #cbd5e1; border-radius:4px;" />`;
    } else if (field.type === 'color') {
      fieldsContainer.innerHTML += `<label style="display:block; margin-top:10px; font-size:0.9rem; font-weight:600;">${field.label}</label><input type="color" id="${fieldId}" value="${value}" style="width:100%; height:40px; margin-top:4px; cursor:pointer;" />`;
    } else if (field.type === 'select') {
      let options = field.options.map(opt => `<option value="${opt}" ${value === opt ? 'selected' : ''}>${opt}</option>`).join('');
      fieldsContainer.innerHTML += `<label style="display:block; margin-top:10px; font-size:0.9rem; font-weight:600;">${field.label}</label><select id="${fieldId}" style="width:100%; padding:8px; margin-top:4px; border:1px solid #cbd5e1; border-radius:4px;">${options}</select>`;
    } else if (field.type === 'number') {
      const numVal = typeof value === 'string' ? value.replace('px', '') : value;
      fieldsContainer.innerHTML += `<label style="display:block; margin-top:10px; font-size:0.9rem; font-weight:600;">${field.label} (${field.unit || ''})</label><input type="number" id="${fieldId}" min="${field.min}" max="${field.max}" value="${numVal}" style="width:100%; padding:8px; margin-top:4px; border:1px solid #cbd5e1; border-radius:4px;" />`;
    }
  });

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