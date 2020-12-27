import {canvas} from '../modules/canvas.mjs';

export default class Rectangle {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.width = w;
    this.height = h;
  }

  draw() {
    // canvas.ctx.save();
    // canvas.ctx.fillStyle = 'rgba(255,0,0,.2)';
    // canvas.ctx.fillRect(this.x, this.y, this.width, this.height);
    // canvas.ctx.restore();
  }

  update() {}
}
