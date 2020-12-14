;(function () {
  'use strict';

  function Sprite(url, pxy, pos, size, speed, frames, once) {
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

  Sprite.prototype.update = function () {
    this.i += this.speed * Game.dt;
  }

  Sprite.prototype.draw = function () {
    var frame = 0;

    if (this.speed > 0 && this.frames.length > 1) {
      var max = this.frames.length;
      var idx = Math.floor(this.i);
      frame = this.frames[idx % max];

      if (this.once && idx >= max) {
        this.done = true;
        return;
      }
    }

    var sx = this.pos[0] + (frame * this.size[0]);
    var sy = this.pos[1];
    // Game.ctx.strokeRect(this.pxy[0], this.pxy[1], this.size[0], this.size[1])
    Game.ctx.drawImage(resources.get(this.url), sx, sy, this.size[0], this.size[1], this.pxy[0], this.pxy[1], this.size[0], this.size[1]);
  }

  window.Sprite = Sprite;
})();
