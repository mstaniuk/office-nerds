import Player from '../classes/Player.mjs';

import {time} from './time.mjs';
import {isKeyDown} from './input.mjs';
import {camera, offsetBy as offsetCameraBy} from './camera.mjs';
import {core} from './core.mjs';

export function update() {
  if (isKeyDown('UP')) {
    offsetCameraBy(0, -1 * camera.movementSpeed * time.dt);
  }

  if (isKeyDown('DOWN')) {
    offsetCameraBy(0, camera.movementSpeed * time.dt);
  }

  if (isKeyDown('LEFT')) {
    offsetCameraBy(-1 * camera.movementSpeed * time.dt, 0);
  }

  if (isKeyDown('RIGHT')) {
    offsetCameraBy(camera.movementSpeed * time.dt, 0);
  }

  switch (true) {
    case (isKeyDown('W') && isKeyDown('A')):
      core.player.direction = 5 * Math.PI / 4;
      core.player.velocity = Player.walkingSpeed;
      break;
    case (isKeyDown('W') && isKeyDown('D')):
      core.player.direction = 7 * Math.PI / 4;
      core.player.velocity = Player.walkingSpeed;
      break;
    case (isKeyDown('S') && isKeyDown('A')):
      core.player.direction = 3 * Math.PI / 4;
      core.player.velocity = Player.walkingSpeed;
      break;
    case (isKeyDown('S') && isKeyDown('D')):
      core.player.direction = Math.PI / 4;
      core.player.velocity = Player.walkingSpeed;
      break;
    case (isKeyDown('W')):
      core.player.direction = 3 * Math.PI / 2;
      core.player.velocity = Player.walkingSpeed;
      break;
    case (isKeyDown('S')):
      core.player.direction = Math.PI / 2;
      core.player.velocity = Player.walkingSpeed;
      break;
    case (isKeyDown('A')):
      core.player.direction = Math.PI;
      core.player.velocity = Player.walkingSpeed;
      break;
    case (isKeyDown('D')):
      core.player.direction = 2 * Math.PI;
      core.player.velocity = Player.walkingSpeed;
      break;
    default:
      core.player.velocity = 0;
  }
}

