import { getSelectedElement } from './canvas.js';

export function initProperties() {
  // No static listeners needed now – we rebuild panel on selection
}

export function loadProperties(el) {
  const panel = document.getElementById('properties-panel');
  if (!panel) return;

  // Clear panel except maybe the header
  panel.innerHTML = `
    <h3>Properties</h3>
    <div id="prop-fields"></div>
    <hr />
    <button onclick="deleteSelected()" class="btn btn-danger">Delete</button>
  `;

  const fieldsContainer = document.getElementById('prop-fields');

  // Find all elements with data-editable attribute
  const editableElements = el.querySelectorAll('[data-editable]');
  
  editableElements.forEach((elem, index) => {
    const key = elem.getAttribute('data-editable');
    const tag = elem.tagName.toLowerCase();
    const currentText = elem.innerText;
    const currentSrc = elem.src; // for images
    
    if (tag === 'img') {
      // Image source editable
      const fieldId = `prop-${key}-${index}`;
      fieldsContainer.innerHTML += `
        <label>${key} (image URL)</label>
        <input type="text" id="${fieldId}" value="${currentSrc || ''}" placeholder="Image URL" />
      `;
      // Add event listener after element is added
      setTimeout(() => {
        document.getElementById(fieldId)?.addEventListener('input', (e) => {
          elem.src = e.target.value;
        });
      }, 0);
    } else {
      // Text content editable
      const fieldId = `prop-${key}-${index}`;
      fieldsContainer.innerHTML += `
        <label>${key}</label>
        <input type="text" id="${fieldId}" value="${currentText.replace(/"/g, '&quot;')}" />
      `;
      setTimeout(() => {
        document.getElementById(fieldId)?.addEventListener('input', (e) => {
          elem.innerText = e.target.value;
        });
      }, 0);
    }
  });

  // Add color picker for background
  fieldsContainer.innerHTML += `
    <label>Background Color</label>
    <input type="color" id="prop-bgcolor" value="${rgbToHex(el.style.backgroundColor) || '#6366f1'}" />
  `;
  setTimeout(() => {
    document.getElementById('prop-bgcolor')?.addEventListener('input', (e) => {
      el.style.backgroundColor = e.target.value;
    });
  }, 0);
}

function rgbToHex(rgb) {
  if (!rgb || rgb === '') return '#6366f1';
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return '#6366f1';
  return '#' + ((1 << 24) + (parseInt(match[1]) << 16) + (parseInt(match[2]) << 8) + parseInt(match[3])).toString(16).slice(1);
}

// Delete function
window.deleteSelected = () => {
  const el = getSelectedElement();
  if (el && confirm('Delete this component?')) {
    el.remove();
    // Clear properties panel
    document.getElementById('properties-panel').innerHTML = `
      <h3>Properties</h3>
      <p>Select a component to edit</p>
    `;
  }
};