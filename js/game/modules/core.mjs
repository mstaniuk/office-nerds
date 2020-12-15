import Player from '../classes/Player.mjs';
import GameMap from '../classes/GameMap.mjs';

import {canvas} from './canvas.mjs'
import {camera, centerOn as centerCameraOn} from './camera.mjs';
import {mouse, update as updateMouse} from './mouse.mjs';
import {time, update as updateTime, init as initializeTime} from './time.mjs';
import {update as updateKeyboard} from './keyboard.mjs';

export const core = {
  map: null,

  // Objects
  player: null,
  mobs: [],
  explosions: [],
  teleports: [],
  shapes: [],
  particles: [],
  hud: [],
};

function tick() {
  update();
  render();


  // temporary this reference
  requestAnimationFrame(() => {
    tick();
  });
}

function updateEntities(list) {
  for (let i = 0; i < list.length; ++i) {
    list[i].update();

    if (list[i].done || list[i].dead) {
      list.splice(i, 1);
    }
  }
}

function update() {
  updateTime();
  updateMouse();
  updateKeyboard();
  updateEntities(core.particles);
  core.player.update();
}

function render() {

  // draw background
  canvas.ctx.fillStyle = '#ffffff';
  canvas.ctx.fillRect(0, 0, canvas.width, canvas.height);

  core.map.drawBackground();

  canvas.ctx.save();
  canvas.ctx.translate(-camera.oX, -camera.oY);

  canvas.ctx.save();
  core.player.draw();
  canvas.ctx.restore();

  // Player.draw();
  // this.drawEntities(this.explosions);
  drawEntities(core.particles);
  // this.drawEntities(this.shapes);
  core.map.drawForeground();
  canvas.ctx.restore();

  // TEMP: Debug console
  canvas.ctx.save();
  canvas.ctx.globalAlpha = 0.75;
  canvas.ctx.fillStyle = '#222222';
  canvas.ctx.fillRect(0, 0, 300, 110);
  canvas.ctx.restore();

  canvas.ctx.font = '15px Arial';
  canvas.ctx.fillStyle = '#f1f1f1';
  canvas.ctx.fillText('Time: ' + time.gameTime.toFixed(2) + '; FPS: ' + (1 / time.dt).toFixed(2), 5, 20);
  canvas.ctx.fillText('Mouse X: ' + mouse.x.toFixed(2) + '; Mouse Y: ' + mouse.y.toFixed(2), 5, 40);
  canvas.ctx.fillText('Mouse raw X: ' + mouse.rawX.toFixed(2) + '; Mouse raw Y: ' + mouse.rawY.toFixed(2), 5, 60);
  canvas.ctx.fillText('Camera oX: ' + camera.oX.toFixed(2) + '; Camera oY: ' + camera.oY.toFixed(2), 5, 80);
  canvas.ctx.fillText('Player X: ' + core.player.x.toFixed(2) + '; Player Y: ' + core.player.y.toFixed(2), 5, 100);
  //END TEMP

}

function drawEntities(list) {
  for (let i = 0; i < list.length; ++i) {
    list[i].draw();
  }
}

export function init() {
  core.map = new GameMap();
  core.player = new Player(0, 0);
  centerCameraOn(core.player.x, core.player.y);
  initializeTime();
  tick();
}


