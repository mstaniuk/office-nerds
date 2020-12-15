import {canvas} from '../modules/canvas.mjs';

export default class Particle {
    constructor(x, y, velocity, radius, direction) {
      this.x = x;
      this.y = y;
      this.velocity = velocity;
      this.radius = radius;
      this.direction = direction;
    }

    drawSkeleton() {
      canvas.ctx.save();
      canvas.ctx.beginPath();
      canvas.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      canvas.ctx.moveTo(this.x, this.y);
      canvas.ctx.lineTo(this.x + Math.cos(this.direction) * this.radius, this.y + Math.sin(this.direction) * this.radius);
      canvas.ctx.stroke();
      canvas.ctx.restore();
    }

    draw() {
      this.drawSkeleton();
    }

    update() {

    }
  }
