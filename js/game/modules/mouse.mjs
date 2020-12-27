import {canvas} from './canvas.mjs';
import {camera} from './camera.mjs';
import {core} from './core.mjs';

export const mouse = {
  rawX: 0,
  rawY: 0,
  x: 0,
  y: 0,
}


function updatePosition(e) {
  if (canvas.element) {
    const rect = canvas.element.getBoundingClientRect();
    mouse.rawX = Math.floor(e.clientX - rect.left);
    mouse.rawY = Math.floor(e.clientY - rect.top);
  }
}

export function update() {
  mouse.x = mouse.rawX + camera.oX;
  mouse.y = mouse.rawY + camera.oY;
}

function leftClickHandler() {
  core.player.shoot();
}

function rightClickHandler() {
  console.log('Right click');
}


window.addEventListener('mousemove', function (e) {
  updatePosition(e);
}, false);

window.addEventListener('click', function (e) {
  updatePosition(e);
  leftClickHandler();
}, false);

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  updatePosition(e);
  rightClickHandler();
}, false);
