(function () {
  'use strict';

  function GameMap() {
    this.backgroundResource = Game.resources.get('img/map.png');

    // this.wall = new Polygon([
    //   [640, 504],
    //   [640, 456],
    //   [0, 456],
    //   [0, 0],
    //   [1328, 0],
    //   [1328, 664],
    //   [640, 664],
    //   [640, 560],
    //   [696, 560],
    //   [696, 608],
    //   [1272, 608],
    //   [1272, 56],
    //   [56, 56],
    //   [56, 392],
    //   [696, 392],
    //   [696, 504]
    // ])
  }

  GameMap.prototype.drawBackground = function () {
    Game.core.ctx.drawImage(
      this.backgroundResource,
      Game.camera.oX,
      Game.camera.oY,
      Game.core.canvas.width,
      Game.core.canvas.height,
      0,
      0,
      Game.core.canvas.width,
      Game.core.canvas.height
    );
  }

  GameMap.prototype.drawForeground = function () {
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

  window.GameMap = GameMap;
})();
