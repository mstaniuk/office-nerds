'use strict';
var Keyboard = {};
Keyboard.handleInput = function () {
  // Camera movement
  if (input.isDown('UP')) {
    Camera.offsetBy(0, -1);
  }

  if (input.isDown('DOWN')) {
    Camera.offsetBy(0, 1);
  }

  if (input.isDown('LEFT')) {
    Camera.offsetBy(-1, 0);
  }

  if (input.isDown('RIGHT')) {
    Camera.offsetBy(1, 0);
  }

  switch(true) {
    case (input.isDown('W') && input.isDown('A')):
      Player.walkDirection = 3 * Math.PI / 4;
      Player.speed = Player.walkingSpeed;
      break;
    case (input.isDown('W') && input.isDown('D')):
      Player.walkDirection = Math.PI / 4;
      Player.speed = Player.walkingSpeed;
      break;
    case (input.isDown('S') && input.isDown('A')):
      Player.walkDirection = 5 * Math.PI / 4;
      Player.speed = Player.walkingSpeed;
      break;
    case (input.isDown('S') && input.isDown('D')):
      Player.walkDirection = 7 * Math.PI / 4;
      Player.speed = Player.walkingSpeed;
      break;
    case (input.isDown('W')):
      Player.walkDirection = Math.PI / 2;
      Player.speed = Player.walkingSpeed;
      break;
    case (input.isDown('S')):
      Player.walkDirection = 3 * Math.PI / 2;
      Player.speed = Player.walkingSpeed;
      break;
    case (input.isDown('A')):
      Player.walkDirection = Math.PI;
      Player.speed = Player.walkingSpeed;
      break;
    case (input.isDown('D')):
      Player.walkDirection = 2 * Math.PI;
      Player.speed = Player.walkingSpeed;
      break;
    default:
      Player.speed = 0;
  }
}
