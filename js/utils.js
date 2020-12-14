;(function () {
  'use strict';

  function roundTo(num, place) {
    return Math.round(num * Math.pow(10, place)) / Math.pow(10, place);
  }

  function randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  function randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  function dist2(p1, p2) {
    return (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
  }

  function dist2XY(p1x, p1y, p2x, p2y) {
    return (p1x - p2x) * (p1x - p2x) + (p1y - p2y) * (p1y - p2y);
  }

  function dist(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
  }

  function distXY(p1x, p1y, p2x, p2y) {
    return Math.sqrt((p1x - p2x) * (p1x - p2x) + (p1y - p2y) * (p1y - p2y));
  }

  function distPointLine(p, a, b) {
    var PA = {x: p.x - a.x, y: p.y - a.y};
    var PB = {x: b.x - a.x, y: b.y - a.y};
    var dot = PA.x * PB.x + PA.y * PB.y;

    var len_sq = Math.pow(PB.x, 2) + Math.pow(PB.y, 2);
    var param = -1;
    if (len_sq !== 0) {
      param = dot / len_sq;
    }
    if (param < 0) {
      return Math.sqrt(Math.pow(p.x - a.x, 2) + Math.pow(p.y - a.y, 2));
    } else if (param > 1) {
      return Math.sqrt(Math.pow(p.x - b.x, 2) + Math.pow(p.y - b.y, 2));
    }
    var xx = a.x + param * PB.x;
    var yy = a.y + param * PB.y;
    return Math.sqrt(Math.pow(p.x - xx, 2) + Math.pow(p.y - yy, 2));
  }

  function collisionPolygonCircle(polygon, circle) {
    var vertices = polygon.points;

    var cx = circle.cx;
    var cy = circle.cy;
    var r = circle.r;
    // go through each of the vertices, plus
    // the next vertex in the list
    var next = 0;
    for (var current = 0; current < vertices.length; current++) {

      // get next vertex in list
      // if we've hit the end, wrap around to 0
      next = current + 1;
      if (next === vertices.length) {
        next = 0;
      }

      // get the PVectors at our current position
      // this makes our if statement a little cleaner
      var vc = vertices[current];    // c for "current"
      var vn = vertices[next];       // n for "next"

      // check for collision between the circle and
      // a line formed between the two vertices
      var collision = collisionLineCircle({x1: vc.x, y1: vc.y, x2: vn.x, y2: vn.y}, {cx, cy, r});
      if (collision) {
        return true;
      }
    }

    // the above algorithm only checks if the circle
    // is touching the edges of the polygon – in most
    // cases this is enough, but you can un-comment the
    // following code to also test if the center of the
    // circle is inside the polygon

    // boolean centerInside = polygonPoint(vertices, cx,cy);
    // if (centerInside) return true;

    // otherwise, after all that, return false
    return false;
  }

  function collisionLineCircle(line, circle) {
    var x1 = line.x1;
    var x2 = line.x2;
    var y1 = line.y1;
    var y2 = line.y2;

    var cx = circle.cx;
    var cy = circle.cy;
    var r = circle.r;

    // is either end INSIDE the circle?
    // if so, return true immediately
    var inside1 = pointCircle({px: x1, py: y1}, circle);
    var inside2 = pointCircle({px: x2, py: y2}, circle);
    if (inside1 || inside2) {
      return true;
    }

    // get length of the line
    var len = distXY(x1, y1, x2, y2);

    // get dot product of the line and circle
    var dot = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / Math.pow(len, 2);

    // find the closest point on the line
    var closestX = x1 + (dot * (x2 - x1));
    var closestY = y1 + (dot * (y2 - y1));

    // is this point actually on the line segment?
    // if so keep going, but if not, return false
    var onSegment = collisionLinePoint({x1, y1, x2, y2}, {x: closestX, y: closestY});
    if (!onSegment) {
      return false;
    }

    // get distance to closest point
    var distance = distXY(closestX, closestY, cx, cy);

    // is the circle on the line?
    return distance <= r;
  }

  function collisionLinePoint(line, point) {
    var x1 = line.x1;
    var x2 = line.x2;
    var y1 = line.y1;
    var y2 = line.y2;

    var px = point.x;
    var py = point.y;

    // get distance from the point to the two ends of the line
    var d1 = distXY(px, py, x1, y1);
    var d2 = distXY(px, py, x2, y2);

    // get the length of the line
    var lineLen = distXY(x1, y1, x2, y2);

    // since floats are so minutely accurate, add
    // a little buffer zone that will give collision
    var buffer = 0.1;    // higher # = less accurate

    // if the two distances are equal to the line's
    // length, the point is on the line!
    // note we use the buffer here to give a range, rather
    // than one #
    return d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer;
  }

  function pointCircle(point, circle) {

    var px = point.x;
    var py = point.y;

    var cx = circle.cx;
    var cy = circle.cy;
    var r = circle.r;


    // get distance between the point and circle's center
    // using the Pythagorean Theorem
    var distance = distXY(px, py, cx, cy);

    // if the distance is less than the circle's
    // radius the point is inside!
    return distance <= r;

  }


  window.Utils = {
    roundTo: roundTo,
    randomRange: randomRange,
    randomInt: randomInt,
    dist2: dist2,
    dist2XY: dist2XY,
    dist: dist,
    distXY: distXY,
    distPointLine: distPointLine,
    collisionPolygonCircle: collisionPolygonCircle,
  };
})();
