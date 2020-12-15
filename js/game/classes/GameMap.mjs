import {get as getResource} from '../modules/resources.mjs';
import {canvas} from '../modules/canvas.mjs';
import {camera} from '../modules/camera.mjs';

export default class GameMap {
  constructor() {
    this.backgroundResource = getResource('img/map.png');
  }

  drawBackground = function () {

    canvas.ctx.drawImage(
      this.backgroundResource,
      camera.oX,
      camera.oY,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
  }

  drawForeground = function () {
    // this.wall.draw();
    // Game.ctx.save();
    // Game.ctx.globalAlpha = 0.5;
    // Game.ctx.drawImage(
    //   this.foregroundResource,
    //   Camera.oX,
    //   Camera.oY,
    //   Game.canvas.width,
    //   Game.canvas.height,
    //   0,
    //   0,
    //   Game.canvas.width,
    //   Game.canvas.height
    // );
    // Game.ctx.restore();
  }
}
