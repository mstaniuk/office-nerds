;(function () {
  'use strict';
  var mouse = {
    rawX: 0,
    rawY: 0,
    x: 0,
    y: 0,
  }


  mouse.updatePos = function updatePos(e) {
    if (Game.core.canvas) {
      var rect = Game.core.canvas.getBoundingClientRect();
      mouse.rawX = Math.floor(e.clientX - rect.left);
      mouse.rawY = Math.floor(e.clientY - rect.top);
    }
  }

  mouse.update = function update() {
    mouse.x = mouse.rawX + Game.camera.oX;
    mouse.y = mouse.rawY + Game.camera.oY;
  }

  mouse.onLeftClick = function onLeftClick() {
    console.log('left click')
  }

  mouse.onRightClick = function onRightClick() {
    console.log('Right click')
  }


  window.addEventListener('mousemove', function (e) {
    mouse.updatePos(e);
  }, false);

  window.addEventListener('click', function (e) {
    mouse.updatePos(e);
    mouse.onLeftClick();
  }, false);

  window.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    mouse.updatePos(e);
    mouse.onRightClick();
  }, false);

  window.Game.mouse = mouse;
})()
