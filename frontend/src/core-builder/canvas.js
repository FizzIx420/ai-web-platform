import { components } from './component.js';
import { componentSchemas } from './componentSchemas.js';
import { renderComponent } from './renderer.js';

let componentsData = []; 
let selectedId = null;
let draggedId = null;
let dragOffsetX, dragOffsetY;
let resizeHandle = null;
let startX, startY, startWidth, startHeight;

let isPanning = false;
let panStartX, panStartY, scrollStartX, scrollStartY;

const GRID_SIZE = 10; 
const SNAP_PADDING = 10; 
const SNAP_RADIUS = 25;  

export function initCanvas() {
  const canvas = document.getElementById('canvas');
  canvas.style.position = 'relative';
  canvas.style.backgroundSize = 'cover';
  canvas.style.backgroundPosition = 'center';
  canvas.addEventListener('dragover', (e) => e.preventDefault());
  canvas.addEventListener('drop', handleDrop);
  
  canvas.addEventListener('click', (e) => { 
    if (e.target.id === 'canvas' || e.target.id === 'virtual-space') deselectAll(); 
  });

  canvas.addEventListener('mousedown', (e) => {
    if (e.button === 2 || e.button === 1) {
      e.preventDefault();
      isPanning = true;
      panStartX = e.clientX;
      panStartY = e.clientY;
      scrollStartX = canvas.scrollLeft;
      scrollStartY = canvas.scrollTop;
      canvas.style.cursor = 'grabbing';
    }
  });

  window.addEventListener('mousemove', (e) => {
    if (isPanning) {
      canvas.scrollLeft = scrollStartX - (e.clientX - panStartX);
      canvas.scrollTop = scrollStartY - (e.clientY - panStartY);
    }
  });

  window.addEventListener('mouseup', () => {
    if (isPanning) {
      isPanning = false;
      canvas.style.cursor = 'default';
    }
  });

  canvas.addEventListener('contextmenu', e => e.preventDefault());
  renderAllComponents();
}

function renderAllComponents() {
  const canvas = document.getElementById('canvas');
  canvas.innerHTML = '<div id="virtual-space" style="position: absolute; width: 4000px; height: 4000px; top: 0; left: 0; pointer-events: none;"></div>'; 
  
  componentsData.forEach(comp => {
    const el = renderComponent(comp);
    el.setAttribute('data-id', comp.id);
    el.style.position = 'absolute';
    el.style.left = comp.x + 'px';
    el.style.top = comp.y + 'px';
    el.style.width = comp.width + 'px';
    el.style.height = comp.height + 'px';
    el.style.cursor = 'move';
    
    el.addEventListener('mousedown', (e) => {
      if (e.target.isContentEditable || e.target.tagName === 'INPUT') return;
      if (e.button === 0) startDrag(e, comp.id);
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
  const comp = componentsData.find(c => c.id === draggedId);
  
  let newX = e.clientX - canvas.getBoundingClientRect().left + canvas.scrollLeft - dragOffsetX;
  let newY = e.clientY - canvas.getBoundingClientRect().top + canvas.scrollTop - dragOffsetY;

  newX = Math.round(newX / GRID_SIZE) * GRID_SIZE;
  newY = Math.round(newY / GRID_SIZE) * GRID_SIZE;

  componentsData.forEach(other => {
    if (other.id === draggedId) return;
    if (Math.abs((newY + comp.height + SNAP_PADDING) - other.y) < SNAP_RADIUS) newY = other.y - comp.height - SNAP_PADDING;
    else if (Math.abs(newY - (other.y + other.height + SNAP_PADDING)) < SNAP_RADIUS) newY = other.y + other.height + SNAP_PADDING;
    else if (Math.abs(newY - other.y) < SNAP_RADIUS) newY = other.y; 

    if (Math.abs((newX + comp.width + SNAP_PADDING) - other.x) < SNAP_RADIUS) newX = other.x - comp.width - SNAP_PADDING;
    else if (Math.abs(newX - (other.x + other.width + SNAP_PADDING)) < SNAP_RADIUS) newX = other.x + other.width + SNAP_PADDING;
    else if (Math.abs(newX - other.x) < SNAP_RADIUS) newX = other.x; 
  });

  comp.x = Math.max(0, newX);
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
    let snappedX = Math.round((e.clientX - canvas.getBoundingClientRect().left + canvas.scrollLeft) / GRID_SIZE) * GRID_SIZE;
    let snappedY = Math.round((e.clientY - canvas.getBoundingClientRect().top + canvas.scrollTop) / GRID_SIZE) * GRID_SIZE;
    
    const newComponent = {
      id: 'comp_' + Date.now() + Math.random(),
      type: type,
      x: Math.max(0, snappedX),
      y: Math.max(0, snappedY),
      width: 800, height: 350, 
      content: JSON.parse(JSON.stringify(componentSchemas[type].defaultContent)),
      styles: JSON.parse(JSON.stringify(componentSchemas[type].defaultStyles))
    };
    componentsData.push(newComponent);
    renderAllComponents();
  }
}

function selectComponent(id) {
  if (selectedId === id) return; 
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
  // Load empty properties to show Canvas settings
  import('./properties.js').then(module => module.loadProperties(null));
}

function addResizeHandle(id) {
  removeResizeHandle();
  const el = document.querySelector(`[data-id="${id}"]`);
  if(!el) return;
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
  
  // FREE WILL RESIZING: Width and Height move entirely independently!
  let newWidth = Math.round((startWidth + dx) / GRID_SIZE) * GRID_SIZE;
  let newHeight = Math.round((startHeight + dy) / GRID_SIZE) * GRID_SIZE;

  comp.width = Math.max(200, newWidth);
  comp.height = Math.max(100, newHeight);
  
  renderAllComponents();
  const el = document.querySelector(`[data-id="${selectedId}"]`);
  if (el) el.classList.add('selected');
  addResizeHandle(selectedId);
}

function stopResize() {
  document.removeEventListener('mousemove', onResize);
  document.removeEventListener('mouseup', stopResize);
}

export function getSelectedComponent() { return componentsData.find(c => c.id === selectedId); }

export function updateComponent(updatedData, reloadProps = true) {
  const index = componentsData.findIndex(c => c.id === updatedData.id);
  if (index !== -1) {
    componentsData[index] = updatedData;
    renderAllComponents();
    if (reloadProps) {
      selectComponent(updatedData.id);
    } else {
      const el = document.querySelector(`[data-id="${updatedData.id}"]`);
      if (el) el.classList.add('selected');
      addResizeHandle(updatedData.id);
    }
  }
}

export function addComponent(type) {
  if (type && componentSchemas[type]) {
    const canvas = document.getElementById('canvas');
    const newComponent = {
      id: 'comp_' + Date.now() + Math.random(),
      type: type,
      x: canvas.scrollLeft + 50,
      y: canvas.scrollTop + 50,
      width: 800, height: 350,
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
  deselectAll();
  renderAllComponents();
}

// THE MEMORY FIX: This safely saves text changes instantly when you click away
window.updateText = (id, path, text) => {
  const comp = componentsData.find(c => c.id === id);
  if (!comp) return;
  const parts = path.split('.');
  const last = parts.pop();
  const target = parts.reduce((o, p) => o[p] = o[p] || {}, comp);
  target[last] = text;
};

window.addComponent = addComponent;
window.deleteSelectedComponent = deleteSelectedComponent;