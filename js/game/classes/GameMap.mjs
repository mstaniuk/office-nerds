import {get as getResource} from '../modules/resources.mjs';
import {canvas} from '../modules/canvas.mjs';
import {camera} from '../modules/camera.mjs';

export default class GameMap {
  constructor() {
    this.backgroundResource = getResource('img/office.png');
    this.foregroundResource = getResource('img/office_fg.png');
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
    canvas.ctx.save();
    canvas.ctx.globalAlpha = 0.5;
    canvas.ctx.drawImage(
      this.foregroundResource,
      camera.oX,
      camera.oY,
      canvas.width,
      canvas.height,
      0,
      0,
      canvas.width,
      canvas.height
    );
    canvas.ctx.restore();
  }
}
