(function () {
  'use strict';

  function Player(x, y) {
    this.x = x;
    this.y = y;
    this.pointDirection = Math.PI / 2;
    this.walkDirection = Math.PI / 2;
    this.speed = 0;
    this.walkingSpeed = 200;
    this.sprite = new Game.Sprite(
      'img/panda.png',
      [0, 0],
      [0, 0],
      [32, 32],
      0,
      [1, 2, 3],
      false
    );
  }

  Player.prototype.update = function () {
    this.sprite.update();
    this.updatePointDirection();
    this.move();
  };

  Player.prototype.updatePointDirection = function () {
    this.pointDirection = Math.atan2(-1 * (Game.mouse.y - this.y), Game.mouse.x - this.x);
  }

  Player.prototype.drawBody = function (directions) {
    var yAnim = 0;

    switch (true) {
      case directions.n:
        // Pointing north
        this.sprite.pos[1] = 32 * 2;
        break;
      case directions.w:
        // Pointing west
        this.sprite.pos[1] = 32 * 4;
        break;
      case directions.s:
        // Pointing South
        this.sprite.pos[1] = 32 * 1;
        break;
      case directions.e:
        // Pointing east
        this.sprite.pos[1] = 32 * 3;
        break;
    }

    if (this.walking) {
      this.sprite.frames = [1, 2];
      this.sprite.speed = this.speed / 10 / this.sprite.frames.length;
      yAnim = Math.sin(Game.core.gameTime * 20) * 1.5;
    } else {
      this.sprite.frames = [0];
    }

    Game.core.ctx.save();
    Game.core.ctx.translate(-this.sprite.size[0] / 2, -this.sprite.size[1] / 2 + yAnim);
    this.sprite.draw();
    Game.core.ctx.restore();

  }

  Player.prototype.drawGun = function () {
    Game.core.ctx.save();
    Game.core.ctx.beginPath();
    Game.core.ctx.rotate(-this.pointDirection);
    Game.core.ctx.moveTo(5, 0);
    Game.core.ctx.lineTo(20, 0);
    Game.core.ctx.lineWidth = 4;
    Game.core.ctx.strokeStyle = '#00022e';
    Game.core.ctx.stroke();
    Game.core.ctx.closePath()
    Game.core.ctx.beginPath();
    Game.core.ctx.moveTo(20, -1);
    Game.core.ctx.lineTo(23, -1);
    Game.core.ctx.lineWidth = 2;
    Game.core.ctx.strokeStyle = 'orange';
    Game.core.ctx.stroke();
    Game.core.ctx.closePath()
    Game.core.ctx.restore();
  }

  Player.prototype.move = function () {
    this.walking = this.speed > 0;

    if (this.walking) {
      const dx = Game.utils.roundTo(Math.cos(this.walkDirection), 2);
      this.x = this.x + dx * this.speed * Game.core.dt;

      const dy = Game.utils.roundTo(Math.sin(this.walkDirection), 2);
      this.y = this.y + dy * this.speed * Game.core.dt;

      Game.camera.centerOn(this.x, this.y);
    }
  }

  Player.prototype.draw = function () {
    const directions = {
      n: this.pointDirection >= Math.PI / 4 && this.pointDirection < 3 * Math.PI / 4,
      w: (this.pointDirection >= 3 * Math.PI / 4 && this.pointDirection < Math.PI) || (this.pointDirection >= -Math.PI && this.pointDirection < -3 * Math.PI / 4),
      s: this.pointDirection >= -3 * Math.PI / 4 && this.pointDirection < -Math.PI / 4,
      e: (this.pointDirection >= -Math.PI / 4 && this.pointDirection < -0) || (this.pointDirection >= 0 && this.pointDirection < Math.PI / 4)
    }
    // draw sprite
    Game.core.ctx.save();
    Game.core.ctx.translate(this.x, this.y);
    if (directions.n || directions.w) {
      this.drawGun();
      this.drawBody(directions);
    } else {
      this.drawBody(directions);
      this.drawGun();
    }
    Game.core.ctx.restore();
  }

  // Player.prototype.leftClick = function() {
  //   Game.particles.push(new Nerf(this.x, this.y, this.pointDirection))
  // }

  window.Game.Player = Player;
})();
