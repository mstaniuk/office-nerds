(function () {
  'use strict';
  window.requestAnimFrame = (function (w) {
    return w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.mozRequestAnimationFrame || function (callback) {
      w.setTimeout(callback, 1000 / 60);
    };
  })(window);

  window.Game.core = {
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
    player: null,
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
      Game.mouse.update();
      // handle keyboard input
      Game.keyboard.update();
      // update mobs
      // this.updateEntities(this.explosions);
      // // update particles
      this.updateEntities(this.particles);

      // update player
      this.player.update();
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
      ctx.translate(-Game.camera.oX, -Game.camera.oY);

      ctx.save();
        this.player.draw();
      ctx.restore();

      // Player.draw();
      // this.drawEntities(this.explosions);
      this.drawEntities(this.particles);
      // this.drawEntities(this.shapes);
      this.map.drawForeground();
      ctx.restore();



      this.drawEntities(this.hud);

      // TEMP: Debug console
      ctx.save();
      ctx.globalAlpha = 0.75;
      ctx.fillStyle = '#222222';
      ctx.fillRect(0, 0, 300, 110);
      ctx.restore();

      ctx.font = '15px Arial';
      ctx.fillStyle = '#f1f1f1';
      ctx.fillText('Time: ' + Game.utils.roundTo(this.gameTime, 2) + '; FPS: ' + Game.utils.roundTo(1 / this.dt, 0), 5, 20);
      ctx.fillText('Mouse X: ' + Game.mouse.x.toFixed(2) + '; Mouse Y: ' + Game.mouse.y.toFixed(2), 5, 40);
      ctx.fillText('Mouse raw X: ' + Game.mouse.rawX.toFixed(2) + '; Mouse raw Y: ' + Game.mouse.rawY.toFixed(2), 5, 60);
      ctx.fillText('Camera oX: ' + Game.camera.oX.toFixed(2) + '; Camera oY: ' + Game.camera.oY.toFixed(2), 5, 80);
      ctx.fillText('Player X: ' + Game.core.player.x.toFixed(2) + '; Player Y: ' + Game.core.player.y.toFixed(2), 5, 100);
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
      this.canvas.width = Game.settings.canvas.width;
      this.canvas.height = Game.settings.canvas.height;

      this.ctx = this.canvas.getContext('2d');
      this.map = new GameMap();
      this.player = new Game.Player(0, 0);
      Game.camera.setOffset(100, 100);
      document.body.appendChild(this.canvas);
      this.particles.push(new Game.Particle(-50, -50, 25, Math.PI));

      this.lastTime = Date.now();

      this.main();
    },
  };
})();

/*
 * RESOURCES
 */
Game.resources.load([
  'img/panda.png',
  'img/nerf.png',
  'img/hit.png',
  'img/stars.png',
  'img/map.png',
  'img/explosion.png',
]);


document.addEventListener('DOMContentLoaded', function (e) {
  Game.resources.onReady(function () {
    Game.core.init();
  });
});


