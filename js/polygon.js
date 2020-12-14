'use strict';

function Polygon(initialPoints) {
  this.points = initialPoints || [];
}

Polygon.prototype.addEdge = function (x,y) {
  this.points.push([x,y]);
}

Polygon.prototype.draw = function () {
  if(this.points.length > 1) {
    Game.ctx.save();
    Game.ctx.globalAlpha = 0.5;
    Game.ctx.fillStyle = 'red';
    Game.ctx.beginPath();
    Game.ctx.moveTo(this.points[0][0],this.points[0][1]);
    for(var i = 1; i < this.points.length; i++) {
      Game.ctx.lineTo(this.points[i][0],this.points[i][1]);
    }
    Game.ctx.closePath();
    Game.ctx.fill();
    Game.ctx.restore();
  }
}

Polygon.prototype.update = function () {

}
