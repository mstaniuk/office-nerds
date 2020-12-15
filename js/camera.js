(function() {
  "use strict";
  var camera = {
    oX: 0, // offset X
    oY: 0,  // offset Y
    movementSpeed: 300, // 300 px per sec
  }

  camera.setOffset = function setOffset(x, y) {
    camera.oX = x;
    camera.oY = y;
  }

  camera.offsetBy = function offsetBy(x, y) {
    camera.oX += x;
    camera.oY += y;
  }

  camera.centerOn = function centerOn(x, y) {
    camera.oX = (x - (Math.floor(Game.core.canvas.width / 2)));
    camera.oY = (y - (Math.floor(Game.core.canvas.height / 2)));
  }

  window.Game.camera = camera;
})();
