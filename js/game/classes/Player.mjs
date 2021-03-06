import Sprite from './Sprite.mjs'
import Particle from './Particle.mjs';
import Nerf from './Nerf.mjs';

import {mouse} from '../modules/mouse.mjs';
import {time} from '../modules/time.mjs';
import {canvas} from '../modules/canvas.mjs';
import {centerOn as centerCameraOn} from '../modules/camera.mjs';
import {core} from '../modules/core.mjs';
import {circleRectangleCollision, roundTo} from '../modules/utils.mjs';

export default class Player extends Particle {
  static walkingSpeed = 300;

  constructor(x, y) {
    super(x, y, 0, 12, Math.PI / 2);
    this.pointDirection = Math.PI / 2;
    this.sprite = new Sprite(
      'img/player.png',
      [0, 0],
      [0, 0],
      [32, 32],
      0,
      [1, 2, 3],
      false
    );
  }

  update() {
    this.sprite.update();
    this.updatePointDirection();
    this.move();
  };

  updatePointDirection() {
    this.pointDirection = Math.atan2(-1 * (mouse.y - this.y), mouse.x - this.x);
  }

  drawBody(directions) {
    let yAnim = 0;

    switch (true) {
      case directions.n:
        // Pointing north
        this.sprite.pos[1] = 32 * 3;
        break;
      case directions.w:
        // Pointing west
        this.sprite.pos[1] = 32 * 1;
        break;
      case directions.s:
        // Pointing South
        this.sprite.pos[1] = 32 * 0;
        break;
      case directions.e:
        // Pointing east
        this.sprite.pos[1] = 32 * 2;
        break;
    }

    if (this.walking) {
      this.sprite.frames = [0, 1, 2, 1];
      yAnim = Math.sin(time.gameTime * 20) * 1.5;
    } else {
      this.sprite.frames = [1];
    }

    this.sprite.speed = this.velocity / 5 / this.sprite.frames.length;

    canvas.ctx.save();
    canvas.ctx.translate(-this.sprite.size[0] / 2, -this.sprite.size[1] / 2 + yAnim);
    this.sprite.draw();
    canvas.ctx.restore();
  }

  drawGun() {
    canvas.ctx.save();
    canvas.ctx.beginPath();
    canvas.ctx.rotate(-this.pointDirection);
    canvas.ctx.moveTo(5, 0);
    canvas.ctx.lineTo(13, 0);
    canvas.ctx.lineWidth = 4;
    canvas.ctx.strokeStyle = '#00022e';
    canvas.ctx.stroke();
    canvas.ctx.closePath()

    canvas.ctx.beginPath();
    canvas.ctx.moveTo(13, -1);
    canvas.ctx.lineTo(16, -1);
    canvas.ctx.lineWidth = 2;
    canvas.ctx.strokeStyle = 'orange';
    canvas.ctx.stroke();
    canvas.ctx.closePath()
    canvas.ctx.restore();
  }


  move() {
    this.walking = this.velocity > 0;

    if (this.walking) {
      const dx = Math.cos(this.direction);
      const dy = Math.sin(this.direction);

      let newX = roundTo(this.x + (dx) * this.velocity * time.dt, 2);
      let newY = roundTo(this.y + (dy) * this.velocity * time.dt, 2);

      const collisionPoints = core.shapes
      .map(shape => circleRectangleCollision(newX, newY, this.radius, shape.x, shape.y, shape.width, shape.height))
      .filter(result => result !== false)

      if (collisionPoints.length > 0) {
        for (let i = 0; i < collisionPoints.length; i++) {
          const collisionPoint = collisionPoints[i];
          const normalizedCollisionPoint = [collisionPoint[0] - this.x, collisionPoint[1] - this.y];
          const collisionDirection = Math.atan2(normalizedCollisionPoint[1], normalizedCollisionPoint[0]);
          const cdx = roundTo(Math.cos(collisionDirection), 0);
          const cdy = roundTo(Math.sin(collisionDirection), 0);

          if (cdx !== 0) {
            newX = roundTo(collisionPoint[0] - this.radius * Math.sign(cdx), 2);
          }
          if (cdy !== 0) {
            newY = roundTo(collisionPoint[1] - this.radius * Math.sign(cdy), 2);
          }
        }
      }

      this.x = newX;
      this.y = newY;


      centerCameraOn(this.x, this.y);
    }
  }

  draw() {
    const directions = {
      n: this.pointDirection >= Math.PI / 4 && this.pointDirection < 3 * Math.PI / 4,
      w: (this.pointDirection >= 3 * Math.PI / 4 && this.pointDirection < Math.PI) || (this.pointDirection >= -Math.PI && this.pointDirection < -3 * Math.PI / 4),
      s: this.pointDirection >= -3 * Math.PI / 4 && this.pointDirection < -Math.PI / 4,
      e: (this.pointDirection >= -Math.PI / 4 && this.pointDirection < -0) || (this.pointDirection >= 0 && this.pointDirection < Math.PI / 4)
    }
    // draw sprite
    canvas.ctx.save();
    canvas.ctx.translate(this.x, this.y);
    if (directions.n || directions.w) {
      this.drawGun();
      this.drawBody(directions);
    } else {
      this.drawBody(directions);
      this.drawGun();
    }
    canvas.ctx.restore();
    // this.drawSkeleton();
  }

  shoot() {
    core.particles.push(new Nerf(this.x, this.y, this.pointDirection))
  }

}
