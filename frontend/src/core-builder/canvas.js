import { components } from './components.js';

let selectedElement = null;
let draggedElement = null;

export function initCanvas() {
  const canvas = document.getElementById('canvas');
  canvas.addEventListener('dragover', (e) => e.preventDefault());
  canvas.addEventListener('drop', handleDrop);
  canvas.addEventListener('click', () => deselectAll());
}

function handleDrop(e) {
  e.preventDefault();
  const name = e.dataTransfer.getData('text/plain');
  if (name && name !== 'move') {
    // Add new component
    addComponent(name);
  } else if (draggedElement) {
    // Move existing component
    const canvas = document.getElementById('canvas');
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const elements = Array.from(canvas.children);
    let insertBefore = null;
    for (let el of elements) {
      const rect = el.getBoundingClientRect();
      if (mouseY < rect.top + rect.height / 2) {
        insertBefore = el;
        break;
      }
    }
    canvas.insertBefore(draggedElement, insertBefore);
    draggedElement = null;
  }
}

export function addComponent(name) {
  const canvas = document.getElementById('canvas');
  const div = document.createElement('div');
  div.innerHTML = components[name];
  div.setAttribute('draggable', true);
  div.classList.add('builder-component');
  div.dataset.type = name;
  div.addEventListener('click', (e) => {
    e.stopPropagation();
    selectElement(div);
  });
  div.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', 'move');
    draggedElement = div;
    div.classList.add('dragging');
  });
  div.addEventListener('dragend', () => {
    div.classList.remove('dragging');
  });
  canvas.appendChild(div);
}

window.addComponent = addComponent;

function selectElement(el) {
  deselectAll();
  el.classList.add('selected');
  selectedElement = el;
  // Populate properties panel
  updatePropertiesPanel(el);
}

function deselectAll() {
  document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
  selectedElement = null;
  clearPropertiesPanel();
}

function clearPropertiesPanel() {
  const panel = document.getElementById('properties-panel');
  if (panel) {
    // Keep the structure but clear values (implementation in properties.js)
  }
}

function updatePropertiesPanel(el) {
  // Delegate to properties module
  import('./properties').then(module => module.loadProperties(el));
}

// Expose for properties panel
export function getSelectedElement() {
  return selectedElement;
}