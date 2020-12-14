'use strict';
var Mouse = {};
Mouse.rawX = 0;
Mouse.rawY = 0;
Mouse.x = 0;
Mouse.y = 0;

Mouse.updatePos = function (e) {
  if(Game.canvas) {
    var rect = Game.canvas.getBoundingClientRect();
    Mouse.rawX = Math.floor(e.clientX - rect.left);
    Mouse.rawY = Math.floor(e.clientY - rect.top);
  }
};

Mouse.update = function () {
  Mouse.x = Mouse.rawX + Camera.oX;
  Mouse.y = Mouse.rawY + Camera.oY;
}

Mouse.onLeftClick = function () {
  console.log('left click')
  Game.tempPolygon.addEdge(Mouse.x, Mouse.y);
  Player.leftClick();
}

Mouse.onRightClick = function () {
  console.log('Right click')
}
// mouse events
window.addEventListener('mousemove', function (e) {
  Mouse.updatePos(e);
}, false);

window.addEventListener('click', function (e) {
  Mouse.updatePos(e);
  Mouse.onLeftClick();
}, false);

window.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  Mouse.updatePos(e);
  Mouse.onRightClick();
}, false);
