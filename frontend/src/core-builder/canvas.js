import { components } from './component.js';
import { componentSchemas } from './componentSchemas.js';
import { renderComponent } from './renderer.js';

let componentsData = []; 
let selectedId = null;
let draggedId = null;
let dragOffsetX, dragOffsetY;
let resizeHandle = null;
let startX, startY, startWidth, startHeight;

const GRID_SIZE = 10; 
const SNAP_PADDING = 10; // The padding between components
const SNAP_RADIUS = 25;  // How close before the magnet activates

export function initCanvas() {
  const canvas = document.getElementById('canvas');
  canvas.style.position = 'relative';
  canvas.style.minHeight = '2000px'; // Massively expanded canvas
  canvas.style.width = '100%';
  canvas.style.background = '#f0f0f0';
  canvas.addEventListener('dragover', (e) => e.preventDefault());
  canvas.addEventListener('drop', handleDrop);
  canvas.addEventListener('click', () => deselectAll());
  renderAllComponents();
}

function renderAllComponents() {
  const canvas = document.getElementById('canvas');
  canvas.innerHTML = ''; 
  componentsData.forEach(comp => {
    const el = renderComponent(comp);
    el.setAttribute('data-id', comp.id);
    el.style.position = 'absolute';
    el.style.left = comp.x + 'px';
    el.style.top = comp.y + 'px';
    el.style.width = comp.width + 'px';
    el.style.height = comp.height + 'px';
    el.style.cursor = 'move';
    
    // THE FIX: Allow clicking into text/inputs without triggering a drag!
    el.addEventListener('mousedown', (e) => {
      if (e.target.isContentEditable || e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      startDrag(e, comp.id);
    });
    
    el.addEventListener('click', (e) => { 
      if (!e.target.isContentEditable) e.stopPropagation(); 
      selectComponent(comp.id); 
    });
    canvas.appendChild(el);
  });
}

function startDrag(e, id) {
  e.preventDefault();
  draggedId = id;
  const rect = e.target.closest('.builder-component').getBoundingClientRect();
  dragOffsetX = e.clientX - rect.left;
  dragOffsetY = e.clientY - rect.top;
  document.addEventListener('mousemove', onDrag);
  document.addEventListener('mouseup', stopDrag);
}

function onDrag(e) {
  if (!draggedId) return;
  const canvas = document.getElementById('canvas');
  const canvasRect = canvas.getBoundingClientRect();
  const comp = componentsData.find(c => c.id === draggedId);
  
  let newX = e.clientX - canvasRect.left - dragOffsetX;
  let newY = e.clientY - canvasRect.top - dragOffsetY;

  // 1. Basic Grid Snap
  newX = Math.round(newX / GRID_SIZE) * GRID_SIZE;
  newY = Math.round(newY / GRID_SIZE) * GRID_SIZE;

  // 2. MAGNETIC SNAPPING ENGINE
  componentsData.forEach(other => {
    if (other.id === draggedId) return;

    // Snap Bottom of Dragged to Top of Other
    if (Math.abs((newY + comp.height + SNAP_PADDING) - other.y) < SNAP_RADIUS) {
      newY = other.y - comp.height - SNAP_PADDING;
    }
    // Snap Top of Dragged to Bottom of Other
    else if (Math.abs(newY - (other.y + other.height + SNAP_PADDING)) < SNAP_RADIUS) {
      newY = other.y + other.height + SNAP_PADDING;
    }

    // Snap X-Axis (Align Left Edges)
    if (Math.abs(newX - other.x) < SNAP_RADIUS) {
      newX = other.x;
    }
  });

  // Clamp within canvas boundaries
  comp.x = Math.max(0, Math.min(newX, canvasRect.width - comp.width));
  comp.y = Math.max(0, newY); 
  
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
    let snappedX = Math.round((e.clientX - canvasRect.left) / GRID_SIZE) * GRID_SIZE;
    let snappedY = Math.round((e.clientY - canvasRect.top) / GRID_SIZE) * GRID_SIZE;
    
    const newWidth = 800; // Better default width for website sections
    const newHeight = 350;

    // Magnetic snap on initial drop
    componentsData.forEach(other => {
      if (Math.abs(snappedY - (other.y + other.height + SNAP_PADDING)) < SNAP_RADIUS) snappedY = other.y + other.height + SNAP_PADDING;
      if (Math.abs(snappedX - other.x) < SNAP_RADIUS) snappedX = other.x;
    });

    const newComponent = {
      id: 'comp_' + Date.now() + Math.random(),
      type: type,
      x: snappedX,
      y: snappedY,
      width: newWidth, 
      height: newHeight, 
      content: JSON.parse(JSON.stringify(componentSchemas[type].defaultContent)),
      styles: JSON.parse(JSON.stringify(componentSchemas[type].defaultStyles))
    };
    componentsData.push(newComponent);
    renderAllComponents();
  }
}

// ... Keep your selectComponent, addResizeHandle, startResize, onResize, stopResize, etc. exactly as they were!

function selectComponent(id) {
  deselectAll();
  selectedId = id;
  const el = document.querySelector(`[data-id="${id}"]`);
  if (el) el.classList.add('selected');
  addResizeHandle(id);
  import('./properties.js').then(module => module.loadProperties(componentsData.find(c => c.id === id)));
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
  
  let newWidth = Math.round((startWidth + dx) / GRID_SIZE) * GRID_SIZE;
  let newHeight = Math.round((startHeight + dy) / GRID_SIZE) * GRID_SIZE;
  
  comp.width = Math.max(150, newWidth);
  comp.height = Math.max(100, newHeight);
  renderAllComponents();
  selectComponent(selectedId);
}

function stopResize() {
  document.removeEventListener('mousemove', onResize);
  document.removeEventListener('mouseup', stopResize);
}

export function getSelectedComponent() { return componentsData.find(c => c.id === selectedId); }
export function updateComponent(updatedData) {
  const index = componentsData.findIndex(c => c.id === updatedData.id);
  if (index !== -1) {
    componentsData[index] = updatedData;
    renderAllComponents();
    selectComponent(updatedData.id);
  }
}

export function addComponent(type) {
  if (type && componentSchemas[type]) {
    const newComponent = {
      id: 'comp_' + Date.now() + Math.random(),
      type: type,
      x: 50, y: 50, width: 800, height: 350,
      content: JSON.parse(JSON.stringify(componentSchemas[type].defaultContent)),
      styles: JSON.parse(JSON.stringify(componentSchemas[type].defaultStyles))
    };
    componentsData.push(newComponent);
    renderAllComponents();
  }
}

export function deleteSelectedComponent() {
  if (!selectedId) return;
  componentsData = componentsData.filter(c => c.id !== selectedId);
  selectedId = null;
  const panel = document.getElementById('properties-panel');
  if (panel) panel.innerHTML = `<h3>Properties</h3><p>Select a component to edit</p>`;
  renderAllComponents();
}

window.addComponent = addComponent;
window.deleteSelectedComponent = deleteSelectedComponent;