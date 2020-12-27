import Sprite from './Sprite.mjs';
import Particle from './Particle.mjs';
import {time} from '../modules/time.mjs';
import {canvas} from '../modules/canvas.mjs';
import {core} from '../modules/core.mjs';
import {circleRectangleCollision} from '../modules/utils.mjs';

export default class Nerf extends Particle {
  constructor(x, y, direction) {
    super(x, y, 400, 2, direction)
    this.sprite = new Sprite('img/nerf.png', [0, 0], [0, 0], [3, 9], 15, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], false);

    // states
    this.dead = false;
  }

  draw() {
    canvas.ctx.save();
    canvas.ctx.translate(this.x, this.y);
    canvas.ctx.rotate(-this.direction + Math.PI / 2);
    this.sprite.draw();
    canvas.ctx.restore();
    this.drawSkeleton();
  }

  update() {
    this.sprite.update();

    const vx = Math.round(Math.cos(this.direction) * 100) / 100;
    this.x = this.x + vx * this.velocity * time.dt;

    const vy = Math.round(Math.sin(this.direction) * -1 * 100) / 100;
    this.y = this.y + vy * this.velocity * time.dt;

    const isCollided = core.shapes
      .map(shape => circleRectangleCollision(this.x, this.y, this.radius, shape.x, shape.y, shape.width, shape.height))
      .some(result => result !== false);
    if(isCollided) {
      this.dead = true;
    }
  }
}
