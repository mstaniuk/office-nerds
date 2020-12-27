import {time} from '../modules/time.mjs';
import {canvas} from '../modules/canvas.mjs';

export default class Line {
  constructor(x1, y1, x2, y2) {
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
  }

  draw() {
    canvas.ctx.save();
    canvas.ctx.moveTo(this.x1, this.y1);
    canvas.ctx.lineTo(this.x2, this.y2);
    canvas.ctx.lineWidth = 2;
    canvas.ctx.strokeStyle = 'black';
    canvas.ctx.stroke();
    canvas.ctx.restore();
  }

  update() {}
}
