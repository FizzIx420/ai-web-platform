import '../styles/builder.css';
import { supabase } from '../supabaseConfig.js';
import { components } from '../core-builder/component.js';
import { initCanvas, addComponent } from '../core-builder/canvas.js';
import { initProperties } from '../core-builder/properties.js';
import { exportSite } from '../core-builder/export.js';

export function builderPage(user) {
  // Initialize after DOM is ready
  setTimeout(() => {
    initCanvas();
    initProperties();
  }, 0);

  // Build component buttons dynamically
  const componentButtons = Object.keys(components).map(name => 
    `<button onclick="addComponent('${name}')">${name}</button>`
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
        <label>Text</label>
        <input id="prop-text" placeholder="Text content" />
        <label>Background Color</label>
        <input id="prop-color" type="color" value="#6366f1" />
        <button id="prop-delete" class="btn btn-danger">Delete</button>
        <hr />
        <button onclick="saveProject('${user.id}')">Save Project</button>
        <button onclick="exportSite()">Export HTML</button>
        <button onclick="publishSite()">Publish</button>
      </div>
    </div>
  `;
}

window.saveProject = async (userId) => {
  const canvas = document.getElementById('canvas').innerHTML;
  const name = prompt('Project name:') || 'Untitled';
  const { error } = await supabase
    .from('projects')
    .insert({
      user_id: userId,
      name,
      content: canvas
    });
  if (error) alert('Error saving: ' + error.message);
  else alert('Project saved!');
};

window.publishSite = async () => {
  alert('Publishing will be implemented with serverless function.');
};

// Ensure addComponent is global
window.addComponent = addComponent;
window.exportSite = exportSite;