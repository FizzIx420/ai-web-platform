export function initProperties() {
  console.log("Properties panel initialized");
}

window.applyProps = () => {
  const text = document.getElementById('prop-text').value;
  const color = document.getElementById('prop-color').value;
  const selected = document.querySelector('.selected');
  
  if (selected) {
    if (text) selected.innerText = text;
    if (color) selected.style.color = color;
  } else {
    alert('Please select an element on the canvas first!');
  }
};