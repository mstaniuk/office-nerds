import {time} from '../modules/time.mjs';
import {canvas} from '../modules/canvas.mjs';
import {get as getResource} from '../modules/resources.mjs';

export default class Sprite {
  constructor(url, pxy, pos, size, speed, frames, once) {
    this.url = url;
    this.pxy = pxy;
    this.pos = pos;
    this.size = size;
    this.speed = (typeof speed === 'number') ? speed : 0;
    this.frames = frames;
    this.once = once;
    this.i = 0;
    this.done = false;
  }

  update() {
    this.i += this.speed * time.dt;
  }

  draw() {
    const max = this.frames.length;
    let frame = max === 1 ? this.frames[0] : 0;

    if (this.speed > 0 && max > 1) {
      const idx = Math.floor(this.i);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    }

    const sx = this.pos[0] + (frame * this.size[0]);
    const sy = this.pos[1];

    // canvas.ctx.strokeRect(this.pxy[0], this.pxy[1], this.size[0], this.size[1])
    canvas.ctx.drawImage(getResource(this.url), sx, sy, this.size[0], this.size[1], this.pxy[0], this.pxy[1], this.size[0], this.size[1]);
  }
}
