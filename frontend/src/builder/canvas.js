import { components } from './components';

export function initCanvas() {
  const canvas = document.getElementById('canvas');
  canvas.addEventListener('dragover', (e) => e.preventDefault());
  canvas.addEventListener('drop', (e) => {
    e.preventDefault();
    const name = e.dataTransfer.getData('text/plain');
    addComponent(name);
  });
}

export function addComponent(name) {
  const canvas = document.getElementById('canvas');
  const div = document.createElement('div');
  div.innerHTML = components[name];
  div.setAttribute('draggable', true);
  div.classList.add('builder-component');
  div.addEventListener('click', (e) => {
    e.stopPropagation();
    selectElement(div);
  });
  div.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', 'move');
  });
  canvas.appendChild(div);
}

window.addComponent = addComponent;

function selectElement(el) {
  document.querySelectorAll('.selected').forEach(e => e.classList.remove('selected'));
  el.classList.add('selected');
}