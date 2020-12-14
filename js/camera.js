(function() {
  "use strict";
  var Camera = {
    oX: 0, // offset X
    oY: 0  // offset Y
  };


  Camera.offsetBy = function(x, y) {
    Camera.oX += x;
    Camera.oY += y;
  }

  Camera.centerOn = function(x, y) {
    Camera.oX = (x - (Math.floor(Game.canvas.width / 2)));
    Camera.oY = (y - (Math.floor(Game.canvas.height / 2)));
  }

  window.Camera = Camera;
})();
