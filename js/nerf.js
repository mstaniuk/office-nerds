'use strict';

function Nerf(x, y, direction) {
  this.x = x;
  this.y = y;
  this.direction = direction;
  this.speed = 500;
  this.sprite = new Sprite('img/nerf.png', [0, 0], [0, 0], [3, 9], this.speed, [0, 1, 2, 3, 4, 5, 6, 7, 8, 9], false);

  // states
  this.dead = false;
}

Nerf.prototype.draw = function () {
  Game.ctx.save();
  Game.ctx.translate(this.x, this.y);
  Game.ctx.rotate(-this.direction + Math.PI/2);
  this.sprite.draw();
  Game.ctx.restore();
}

Nerf.prototype.update = function () {
  this.sprite.update();
  const vy = Math.round(Math.sin(this.direction) * -1 * 100) / 100;
  const vx = Math.round(Math.cos(this.direction) * 100) / 100;
  this.x = this.x + vx * this.speed * Game.dt;
  this.y = this.y + vy * this.speed * Game.dt;
}
