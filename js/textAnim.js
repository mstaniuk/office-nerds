;(function () {
  'use strict';

  function TextAnim(x, y, content, color, size, duration) {
    this.x = x;
    this.y = y;

    this.content = content;

    this.color = color || '#FFD740';
    this.size = size || '13px';
    this.opacity = 1;

    this.duration = duration || 1;
    this.time = 0;
    this.done = false;
  }

  TextAnim.prototype.update = function () {
    // Update time
    this.time += Game.dt;
    // set font size
    this.size = parseFloat(this.size) * (this.time / this.duration) + ' px';
    // set opacity
    this.opacity = 1 - (this.time / this.duration);
    // check if finished
    if (this.time >= this.duration) {
      this.done = true;
    }
  }

  TextAnim.prototype.draw = function () {
    // set text font
    Game.ctx.font = this.size + 'px Arial';
    // set text color
    Game.ctx.fillStyle = this.color;
    // get text size
    var text = Game.ctx.measureText(this.content);
    // set text opacity
    Game.ctx.globalAlpha = this.opacity;
    // Write text
    Game.ctx.fillText(this.content, this.x - text.width / 2, this.y);
    // reset opacity
    Game.ctx.globalAlpha = 1;
  }

  window.TextAnim = TextAnim;
})();
