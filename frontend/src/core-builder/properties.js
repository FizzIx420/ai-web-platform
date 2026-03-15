import { getSelectedElement } from './canvas.js';

export function initProperties() {
  // Set up event listeners for property inputs
  document.getElementById('prop-text')?.addEventListener('input', updateText);
  document.getElementById('prop-color')?.addEventListener('input', updateColor);
  document.getElementById('prop-delete')?.addEventListener('click', deleteElement);
}

export function loadProperties(el) {
  const textInput = document.getElementById('prop-text');
  const colorInput = document.getElementById('prop-color');
  
  // Find first heading or paragraph to edit
  const textElement = el.querySelector('h1, h2, h3, h4, p, span, button');
  if (textElement) {
    textInput.value = textElement.innerText;
  } else {
    textInput.value = '';
  }

  // Get background color if exists
  const bgColor = window.getComputedStyle(el).backgroundColor;
  if (bgColor && bgColor !== 'rgba(0, 0, 0, 0)') {
    // Convert rgb to hex if needed (simplified)
    colorInput.value = rgbToHex(bgColor);
  } else {
    colorInput.value = '#6366f1';
  }
}

function rgbToHex(rgb) {
  // Simplified conversion
  const match = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!match) return '#6366f1';
  return '#' + ((1 << 24) + (parseInt(match[1]) << 16) + (parseInt(match[2]) << 8) + parseInt(match[3])).toString(16).slice(1);
}

function updateText(e) {
  const el = getSelectedElement();
  if (!el) return;
  const textEl = el.querySelector('h1, h2, h3, h4, p, span, button');
  if (textEl) textEl.innerText = e.target.value;
}

function updateColor(e) {
  const el = getSelectedElement();
  if (!el) return;
  el.style.backgroundColor = e.target.value;
}

function deleteElement() {
  const el = getSelectedElement();
  if (el && confirm('Delete this component?')) {
    el.remove();
    document.getElementById('prop-text').value = '';
    document.getElementById('prop-color').value = '#6366f1';
  }
}

// Expose globally for buttons
window.deleteSelected = deleteElement;