;(function() {
  function Particle(x, y, velocity, radius, direction) {
    this.x = x;
    this.y = y;
    this.velocity = velocity;
    this.radius = radius;
    this.direction = direction;
  }

  Particle.prototype.drawSkeleton = function () {
    Game.core.ctx.save();
    Game.core.ctx.beginPath();
    Game.core.ctx.arc(this.x, this.y, this.r, 0, Math.PI*2);
    Game.core.ctx.moveTo(this.x, this.y);
    Game.core.ctx.lineTo(this.x+Math.cos(this.dir)*this.r, this.y+Math.sin(this.dir)*this.r);
    Game.core.ctx.stroke();
    Game.core.ctx.restore();
  }

  Particle.prototype.draw = function () {
    this.drawSkeleton();
  }

  Particle.prototype.update = function () {

  }

  window.Game.Particle = Particle;
})()
