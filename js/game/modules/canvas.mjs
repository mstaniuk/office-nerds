export const canvas = {
  element: null,
  ctx: null,
  width: 800,
  height: 512,
}

export function init() {
  canvas.element = document.createElement('canvas');
  canvas.element.width = canvas.width;
  canvas.element.height = canvas.height;
  canvas.ctx = canvas.element.getContext('2d');
  document.body.appendChild(canvas.element);
}
