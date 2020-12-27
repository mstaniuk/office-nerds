import Player from '../classes/Player.mjs';
import GameMap from '../classes/GameMap.mjs';

import {canvas} from './canvas.mjs'
import {camera, centerOn as centerCameraOn} from './camera.mjs';
import {mouse, update as updateMouse} from './mouse.mjs';
import {init as initializeTime, time, update as updateTime} from './time.mjs';
import {update as updateKeyboard} from './keyboard.mjs';
import Rectangle from '../classes/Rectangle.mjs';
import {circleRectangleCollision} from './utils.mjs';

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
  drawEntities(core.shapes);

  canvas.ctx.restore();
  core.map.drawForeground();

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
  core.player = new Player(100, 275);
  core.shapes.push(new Rectangle(20, 0, 2520, 64)); // Top Map border
  core.shapes.push(new Rectangle(20, 64, 12, 704)); // Left Map border
  core.shapes.push(new Rectangle(2528, 64, 12, 704)); // Right Map Border
  core.shapes.push(new Rectangle(32, 704, 2496, 64)); // Bottom Map Border
  core.shapes.push(new Rectangle(32, 64, 64, 96));
  core.shapes.push(new Rectangle(32, 160, 128, 64));
  core.shapes.push(new Rectangle(224, 160, 256, 64));
  core.shapes.push(new Rectangle(338,64,12,96));
  core.shapes.push(new Rectangle(658,64,12,96));
  core.shapes.push(new Rectangle(544,160,256,64));
  core.shapes.push(new Rectangle(978,64,12,96));
  core.shapes.push(new Rectangle(864,160,256,64));
  core.shapes.push(new Rectangle(1298,64,12,96));
  core.shapes.push(new Rectangle(1184,160,128,64));
  core.shapes.push(new Rectangle(1312,96,32,64));
  core.shapes.push(new Rectangle(1376,96,96,64));
  core.shapes.push(new Rectangle(1504,96,96,64));
  core.shapes.push(new Rectangle(1632,96,96,64));
  core.shapes.push(new Rectangle(1760,96,50,64));
  core.shapes.push(new Rectangle(1426,64,14,32));
  core.shapes.push(new Rectangle(1554,64,14,32));
  core.shapes.push(new Rectangle(1682,64,14,32));
  core.shapes.push(new Rectangle(1810,64,14,288));
  core.shapes.push(new Rectangle(1810,352,428,64));
  core.shapes.push(new Rectangle(2336,352,192,64));
  core.shapes.push(new Rectangle(32,384,128,64));
  core.shapes.push(new Rectangle(224,384,384,64));
  core.shapes.push(new Rectangle(672,384,256,64));
  core.shapes.push(new Rectangle(992,384,192,64));
  core.shapes.push(new Rectangle(1248,384,352,64));
  core.shapes.push(new Rectangle(498,448,14,256));
  core.shapes.push(new Rectangle(786,448,14,256));
  core.shapes.push(new Rectangle(1042,448,14,256));
  core.shapes.push(new Rectangle(1298,448,14,256));
  core.shapes.push(new Rectangle(1586,448,14,74));
  core.shapes.push(new Rectangle(1586,576,14,128));

  centerCameraOn(core.player.x, core.player.y);
  initializeTime();
  tick();
}


