import { components } from './component.js';

let selectedElement = null;
let draggedElement = null;
let resizeHandle = null;
let startX, startY, startWidth, startHeight;

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
    addComponent(name);
  } else if (draggedElement) {
    // Reorder existing component
    const canvas = document.getElementById('canvas');
    const mouseY = e.clientY;
    const elements = Array.from(canvas.children).filter(el => !el.classList.contains('resize-handle'));
    let insertBefore = null;
    for (let el of elements) {
      const rect = el.getBoundingClientRect();
      if (mouseY < rect.top + rect.height / 2) {
        insertBefore = el;
        break;
      }
    }
    canvas.insertBefore(draggedElement, insertBefore);
    draggedElement.classList.remove('dragging');
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
  
  // Make children non-draggable
  div.querySelectorAll('*').forEach(el => el.setAttribute('draggable', false));
  
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
  
  // Add resize handle
  addResizeHandle(el);
  
  // Update properties panel
  import('./properties').then(module => module.loadProperties(el));
}

function deselectAll() {
  document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
  if (selectedElement) {
    removeResizeHandle();
    selectedElement = null;
  }
}

function addResizeHandle(el) {
  removeResizeHandle();
  const handle = document.createElement('div');
  handle.className = 'resize-handle';
  handle.innerHTML = '↘️';
  el.appendChild(handle);
  
  handle.addEventListener('mousedown', initResize);
  resizeHandle = handle;
}

function removeResizeHandle() {
  if (resizeHandle) {
    resizeHandle.remove();
    resizeHandle = null;
  }
}

function initResize(e) {
  e.preventDefault();
  e.stopPropagation();
  
  const el = selectedElement;
  const rect = el.getBoundingClientRect();
  startX = e.clientX;
  startY = e.clientY;
  startWidth = rect.width;
  startHeight = rect.height;
  
  document.addEventListener('mousemove', resize);
  document.addEventListener('mouseup', stopResize);
}

function resize(e) {
  if (!selectedElement) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  selectedElement.style.width = (startWidth + dx) + 'px';
  selectedElement.style.height = (startHeight + dy) + 'px';
}

function stopResize() {
  document.removeEventListener('mousemove', resize);
  document.removeEventListener('mouseup', stopResize);
}

export function getSelectedElement() {
  return selectedElement;
}