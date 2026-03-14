import { supabase } from '../supabaseConfig.js';
import { components } from '../builder/components';
import { initCanvas, addComponent } from '../builder/canvas';
import { initProperties } from '../builder/properties';
import { exportSite } from '../builder/export';

export function builderPage(user) {
  setTimeout(() => {
    initCanvas();
    initProperties();
  }, 0);

  return `
    <h2>Visual Website Builder</h2>
    <div id="builder">
      <div id="components-panel">
        <h3>Components</h3>
        ${Object.keys(components).map(name => `
          <button onclick="addComponent('${name}')">${name}</button>
        `).join('')}
      </div>
      <div id="canvas"></div>
      <div id="properties-panel">
        <h3>Properties</h3>
        <input id="prop-text" placeholder="Text" />
        <input id="prop-color" type="color" />
        <button onclick="applyProps()">Apply</button>
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
  // In production, call backend to generate static site and deploy to Cloudflare Pages
  alert('Publishing feature will be implemented with serverless function.');
};