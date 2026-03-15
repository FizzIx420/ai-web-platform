import { components } from './component.js';
import { componentSchemas } from './componentSchemas.js';
import { renderComponent } from './renderer.js';

let componentsData = []; // Array of { id, type, x, y, width, height, content, styles }
let selectedId = null;
let draggedId = null;
let dragOffsetX, dragOffsetY;
let resizeHandle = null;
let startX, startY, startWidth, startHeight, startLeft, startTop;

const GRID_SIZE = 10; // Snap to 10px grid

export function initCanvas() {
  const canvas = document.getElementById('canvas');
  canvas.style.position = 'relative';
  canvas.style.height = '800px'; // or whatever
  canvas.style.background = '#f0f0f0';
  canvas.addEventListener('dragover', (e) => e.preventDefault());
  canvas.addEventListener('drop', handleDrop);
  canvas.addEventListener('click', () => deselectAll());
  renderAllComponents();
}

function renderAllComponents() {
  const canvas = document.getElementById('canvas');
  canvas.innerHTML = ''; // Clear and re-render
  componentsData.forEach(comp => {
    const el = renderComponent(comp);
    el.setAttribute('data-id', comp.id);
    el.style.position = 'absolute';
    el.style.left = comp.x + 'px';
    el.style.top = comp.y + 'px';
    el.style.width = comp.width + 'px';
    el.style.height = comp.height + 'px';
    el.style.cursor = 'move';
    el.addEventListener('mousedown', (e) => startDrag(e, comp.id));
    el.addEventListener('click', (e) => { e.stopPropagation(); selectComponent(comp.id); });
    canvas.appendChild(el);
  });
}

function startDrag(e, id) {
  e.preventDefault();
  draggedId = id;
  const comp = componentsData.find(c => c.id === id);
  const rect = e.target.getBoundingClientRect();
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
}

function onDrag(e) {
  if (!draggedId) return;
  const canvas = document.getElementById('canvas');
  const canvasRect = canvas.getBoundingClientRect();
  let newX = e.clientX - canvasRect.left - dragOffsetX;
  let newY = e.clientY - canvasRect.top - dragOffsetY;
  // Snap to grid
  newX = Math.round(newX / GRID_SIZE) * GRID_SIZE;
  newY = Math.round(newY / GRID_SIZE) * GRID_SIZE;
  // Clamp within canvas
  newX = Math.max(0, Math.min(newX, canvasRect.width - componentsData.find(c => c.id === draggedId).width));
  newY = Math.max(0, Math.min(newY, canvasRect.height - componentsData.find(c => c.id === draggedId).height));
  
  const comp = componentsData.find(c => c.id === draggedId);
  comp.x = newX;
  comp.y = newY;
  renderAllComponents();
}

function stopDrag() {
  document.removeEventListener('mousemove', onDrag);
  document.removeEventListener('mouseup', stopDrag);
  draggedId = null;
}

function handleDrop(e) {
  e.preventDefault();
  const type = e.dataTransfer.getData('text/plain');
  if (type && componentSchemas[type]) {
    const canvas = document.getElementById('canvas');
    const canvasRect = canvas.getBoundingClientRect();
    const x = e.clientX - canvasRect.left;
    const y = e.clientY - canvasRect.top;
    // Snap to grid
    const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
    const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;
    
    const newComponent = {
      id: 'comp_' + Date.now() + Math.random(),
      type: type,
      x: snappedX,
      y: snappedY,
      width: 400, // default width
      height: 300, // default height
      content: JSON.parse(JSON.stringify(componentSchemas[type].defaultContent)),
      styles: JSON.parse(JSON.stringify(componentSchemas[type].defaultStyles))
    };
    componentsData.push(newComponent);
    renderAllComponents();
  }
}

function selectComponent(id) {
  deselectAll();
  selectedId = id;
  const el = document.querySelector(`[data-id="${id}"]`);
  if (el) el.classList.add('selected');
  // Add resize handle
  addResizeHandle(id);
  // Load into properties panel
  import('./properties').then(module => module.loadProperties(componentsData.find(c => c.id === id)));
}

function deselectAll() {
  document.querySelectorAll('.selected').forEach(el => el.classList.remove('selected'));
  if (selectedId) {
    removeResizeHandle();
    selectedId = null;
  }
}

function addResizeHandle(id) {
  removeResizeHandle();
  const el = document.querySelector(`[data-id="${id}"]`);
  const handle = document.createElement('div');
  handle.className = 'resize-handle';
  handle.innerHTML = '↘️';
  el.appendChild(handle);
  handle.addEventListener('mousedown', (e) => startResize(e, id));
  resizeHandle = handle;
}

function removeResizeHandle() {
  if (resizeHandle) {
    resizeHandle.remove();
    resizeHandle = null;
  }
}

function startResize(e, id) {
  e.preventDefault();
  e.stopPropagation();
  const comp = componentsData.find(c => c.id === id);
  startWidth = comp.width;
  startHeight = comp.height;
  startLeft = comp.x;
  startTop = comp.y;
  startX = e.clientX;
  startY = e.clientY;
  document.addEventListener('mousemove', onResize);
  document.addEventListener('mouseup', stopResize);
}

function onResize(e) {
  if (!selectedId) return;
  const comp = componentsData.find(c => c.id === selectedId);
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  let newWidth = startWidth + dx;
  let newHeight = startHeight + dy;
  // Snap to grid
  newWidth = Math.round(newWidth / GRID_SIZE) * GRID_SIZE;
  newHeight = Math.round(newHeight / GRID_SIZE) * GRID_SIZE;
  // Minimum size
  newWidth = Math.max(50, newWidth);
  newHeight = Math.max(50, newHeight);
  comp.width = newWidth;
  comp.height = newHeight;
  renderAllComponents();
  // Re-select to keep handle
  selectComponent(selectedId);
}

function stopResize() {
  document.removeEventListener('mousemove', onResize);
  document.removeEventListener('mouseup', stopResize);
}

export function getSelectedComponent() {
  return componentsData.find(c => c.id === selectedId);
}

export function updateComponent(updatedData) {
  const index = componentsData.findIndex(c => c.id === updatedData.id);
  if (index !== -1) {
    componentsData[index] = updatedData;
    renderAllComponents();
    // Re-select to update properties panel
    selectComponent(updatedData.id);
  }
}