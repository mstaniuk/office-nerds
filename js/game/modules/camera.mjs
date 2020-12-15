import {canvas} from './canvas.mjs';

export const camera = {
  oX: 0,
  oY: 0,
  movementSpeed: 300,
}

export function setOffset(x, y) {
  camera.oX = x;
  camera.oY = y;
}

export function offsetBy(x, y) {
  camera.oX += x;
  camera.oY += y;
}

export function centerOn(x, y) {
  camera.oX = (x - (Math.floor(canvas.width / 2)));
  camera.oY = (y - (Math.floor(canvas.height / 2)));
}
