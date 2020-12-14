(function () {
  'use strict';

  var Player = {};
  Player.x = 0;
  Player.y = 0;
  Player.pointDirection = Math.PI / 2;
  Player.walkDirection = Math.PI / 2;
  Player.speed = 0;
  Player.walkingSpeed = 200;
  Player.sprite = new Sprite(
    'img/panda.png',
    [0, 0],
    [0, 0],
    [32, 32],
    0,
    [1, 2, 3],
    false
  );

  Player.update = function () {
    this.sprite.update();
    this.updatePointDirection();
    this.move();
  };

  Player.updatePointDirection = function () {
    Player.pointDirection = Math.atan2(-Mouse.y + this.y, Mouse.x - this.x);
  }

  Player.drawBody = function (directions) {
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
      this.sprite.speed = Player.speed / 10 / this.sprite.frames.length;
      yAnim = Math.sin(Game.gameTime * 20) * 1.5;
    } else {
      this.sprite.frames = [0];
    }

    Game.ctx.save();
    Game.ctx.translate(-this.sprite.size[0] / 2, -this.sprite.size[1] / 2 + yAnim);
    this.sprite.draw();
    Game.ctx.restore();

  }

  Player.drawGun = function () {
    Game.ctx.save();
    Game.ctx.beginPath();
    Game.ctx.rotate(-this.pointDirection);
    Game.ctx.moveTo(5, 0);
    Game.ctx.lineTo(20, 0);
    Game.ctx.lineWidth = 4;
    Game.ctx.strokeStyle = '#00022e';
    Game.ctx.stroke();
    Game.ctx.closePath()
    Game.ctx.beginPath();
    Game.ctx.moveTo(20, -1);
    Game.ctx.lineTo(23, -1);
    Game.ctx.lineWidth = 2;
    Game.ctx.strokeStyle = 'orange';
    Game.ctx.stroke();
    Game.ctx.closePath()
    Game.ctx.restore();
  }

  Player.move = function () {
    this.walking = Player.speed > 0;

    if (this.walking) {
      const vy = Math.round(Math.sin(this.walkDirection) * -1 * 100) / 100;
      const vx = Math.round(Math.cos(this.walkDirection) * 100) / 100;
      this.x = this.x + vx * Player.speed * Game.dt;
      this.y = this.y + vy * Player.speed * Game.dt;

      Camera.centerOn(this.x, this.y);
    }
  }

  Player.draw = function () {
    const directions = {
      n: Player.pointDirection >= Math.PI / 4 && Player.pointDirection < 3 * Math.PI / 4,
      w: (Player.pointDirection >= 3 * Math.PI / 4 && Player.pointDirection < Math.PI) || (Player.pointDirection >= -Math.PI && Player.pointDirection < -3 * Math.PI / 4),
      s: Player.pointDirection >= -3 * Math.PI / 4 && Player.pointDirection < -Math.PI / 4,
      e: (Player.pointDirection >= -Math.PI / 4 && Player.pointDirection < -0) || (Player.pointDirection >= 0 && Player.pointDirection < Math.PI / 4)
    }
    // draw sprite
    Game.ctx.save();
    Game.ctx.translate(this.x, this.y);
    if (directions.n || directions.w) {
      this.drawGun();
      this.drawBody(directions);
    } else {
      this.drawBody(directions);
      this.drawGun();
    }
    Game.ctx.restore();
  }

  Player.leftClick = function() {
    Game.particles.push(new Nerf(this.x, this.y, this.pointDirection))
  }

  window.Player = Player;
})();
