(function () {
  'use strict';
  window.requestAnimFrame = (function (w) {
    return w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mozRequestAnimationFrame || function (callback) {
      w.setTimeout(callback, 1000 / 60);
    };
  })(window);

  window.Game = {
    //timestamps
    lastTime: null,
    gameTime: null,
    dt: null,
    tempPolygon: null,

    // canvas
    canvas: null,
    ctx: null,
    map: null,

    // Objects
    mobs: [],
    explosions: [],
    teleports: [],
    shapes: [],
    particles: [],
    hud: [],

    /*
     * MAIN GAME FUNCTION
     */


    main: function () {
      var now = Date.now();
      // delta time
      this.dt = (now - this.lastTime) / 1000.0;
      // Update objects
      this.update();
      // render objects
      this.render();
      // Current time
      this.lastTime = now;

      // temporary this reference
      var that = this;
      window.requestAnimFrame(function () {
        that.main();
      });
    },


    /*
     * UPDATE GAME
     */

    updateEntities: function (list) {
      for (var i = 0; i < list.length; ++i) {
        list[i].update();

        if (list[i].done || list[i].dead) {
          list.splice(i, 1);
        }

      }
    },

    update: function () {
      // Update dame time
      this.gameTime += this.dt;
      // update mouse position
      Mouse.update();
      // handle keyboard input
      Keyboard.handleInput();
      // update mobs
      this.updateEntities(this.explosions);
      // update particles
      this.updateEntities(this.particles);

      // update player
      Player.update();
    },


    /*
     * RENDER
     */

    render: function () {
      var ctx = this.ctx, canvas = this.canvas;

      // draw background
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      this.map.drawBackground();

      ctx.save();
      ctx.translate(-Camera.oX, -Camera.oY);

      Player.draw();
      this.drawEntities(this.explosions);
      this.drawEntities(this.particles);
      this.drawEntities(this.shapes);
      this.map.drawForeground();
      ctx.restore();



      this.drawEntities(this.hud);

      // TEMP: Debug console
      this.ctx.font = '15px Arial';
      this.ctx.fillStyle = '#ff0000';
      this.ctx.fillText('Time: ' + Utils.roundTo(this.gameTime, 2), 5, 20);
      this.ctx.fillText('FPS: ' + (1 / this.dt) , 5, 40);
      this.ctx.fillText('Player X: ' + Player.x.toFixed(2) + '; Player Y: ' + Player.y.toFixed(2) + '; Direction: ' + (Player.walkDirection.toFixed(2)) + '(' + Player.walkDirection * 180 / Math.PI + ' deg)', 5, 60);
      this.ctx.fillText('Point direction: ' + Player.pointDirection.toFixed(2) + ' (' + (Player.pointDirection * (180 / Math.PI)).toFixed(2) + ' deg)', 5, 80);
      this.ctx.fillText('Mouse X: ' + Mouse.x.toFixed(2) + '; Mouse Y: ' + Mouse.y.toFixed(2), 5, 100);
      //END TEMP

    },

    drawEntities: function (list) {
      for (var i = 0; i < list.length; ++i) {
        list[i].draw();
      }
    },

    /*
     * INITIALIZE GAME
     */
    init: function () {

      this.canvas = document.createElement('canvas');
      this.canvas.width = Settings.Canvas.width;
      this.canvas.height = Settings.Canvas.height;

      this.ctx = this.canvas.getContext('2d');
      this.map = new GameMap();

      this.tempPolygon = new Polygon();
      this.shapes.push(this.tempPolygon);

      Camera.centerOn(Player.x, Player.y);
      document.body.appendChild(this.canvas);

      this.lastTime = Date.now();

      this.main();
    },
  };
})();

/*
 * RESOURCES
 */
resources.load([
  'img/player.png',
  'img/panda.png',
  'img/nerf.png',
  'img/hit.png',
  'img/hit1.png',
  'img/maps/zebMap.png',
  'img/maps/cave1l0.png',
  'img/maps/cave1l1.png'
]);


document.addEventListener('DOMContentLoaded', function (e) {
  resources.onReady(function () {
    Game.init();
  });
});


