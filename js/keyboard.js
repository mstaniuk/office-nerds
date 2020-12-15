;(function () {
  'use strict';

  function update() {
    if (Game.input.isDown('UP')) {
      Game.camera.offsetBy(0, -1 * Game.camera.movementSpeed * Game.core.dt);
    }

    if (Game.input.isDown('DOWN')) {
      Game.camera.offsetBy(0, Game.camera.movementSpeed * Game.core.dt);
    }

    if (Game.input.isDown('LEFT')) {
      Game.camera.offsetBy(-1 * Game.camera.movementSpeed * Game.core.dt, 0);
    }

    if (Game.input.isDown('RIGHT')) {
      Game.camera.offsetBy(Game.camera.movementSpeed * Game.core.dt, 0);
    }

    switch (true) {
      case (Game.input.isDown('W') && Game.input.isDown('A')):
        Game.core.player.walkDirection = 5 * Math.PI / 4;
        Game.core.player.speed = Game.core.player.walkingSpeed;
        break;
      case (Game.input.isDown('W') && Game.input.isDown('D')):
        Game.core.player.walkDirection = 7 * Math.PI / 4;
        Game.core.player.speed = Game.core.player.walkingSpeed;
        break;
      case (Game.input.isDown('S') && Game.input.isDown('A')):
        Game.core.player.walkDirection = 3 * Math.PI / 4;
        Game.core.player.speed = Game.core.player.walkingSpeed;
        break;
      case (Game.input.isDown('S') && Game.input.isDown('D')):
        Game.core.player.walkDirection = Math.PI / 4;
        Game.core.player.speed = Game.core.player.walkingSpeed;
        break;
      case (Game.input.isDown('W')):
        Game.core.player.walkDirection = 3 * Math.PI / 2;
        Game.core.player.speed = Game.core.player.walkingSpeed;
        break;
      case (Game.input.isDown('S')):
        Game.core.player.walkDirection = Math.PI / 2;
        Game.core.player.speed = Game.core.player.walkingSpeed;
        break;
      case (Game.input.isDown('A')):
        Game.core.player.walkDirection = Math.PI;
        Game.core.player.speed = Game.core.player.walkingSpeed;
        break;
      case (Game.input.isDown('D')):
        Game.core.player.walkDirection = 2 * Math.PI;
        Game.core.player.speed = Game.core.player.walkingSpeed;
        break;
      default:
        Game.core.player.speed = 0;
    }
  }

  window.Game.keyboard = {
    update: update,
  }

})();
