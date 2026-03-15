import '../styles/builder.css';
import { supabase } from '../supabaseConfig.js';
import { components } from '../core-builder/component.js';
import { initCanvas, addComponent } from '../core-builder/canvas.js';
import { initProperties } from '../core-builder/properties.js';
import { exportSite } from '../core-builder/export.js';
import { componentSchemas } from '../core-builder/componentSchemas.js';

export function builderPage(user) {
  setTimeout(() => {
    initCanvas();
  }, 0);

  // Generate component buttons from schemas
  const componentButtons = Object.keys(componentSchemas).map(type => 
    `<button draggable="true" ondragstart="dragStart(event, '${type}')">${componentSchemas[type].label}</button>`
  ).join('');

  return `
    <h2>Visual Website Builder</h2>
    <div id="builder">
      <div id="components-panel">
        <h3>Components</h3>
        ${componentButtons}
      </div>
      <div id="canvas"></div>
      <div id="properties-panel">
        <h3>Properties</h3>
        <p>Select a component to edit</p>
      </div>
    </div>
  `;
}

// Make drag start global
window.dragStart = (e, type) => {
  e.dataTransfer.setData('text/plain', type);
};

// Global delete function
window.deleteSelectedComponent = () => {
  // To be implemented – need to access componentsData
  alert('Delete will be implemented in canvas');
};