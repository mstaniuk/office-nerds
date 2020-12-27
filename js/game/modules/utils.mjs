export function roundTo(num, place) {
  return Math.round(num * Math.pow(10, place)) / Math.pow(10, place);
}

export function randomRange(min, max) {
  return min + Math.random() * (max - min);
}

export function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max - min + 1));
}

export function distSq(x1, y1, x2, y2) {
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}

export function dist(x1, y1, x2, y2) {
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

export function clamp(val, min, max) {
  return Math.max(min, Math.min(max, val))
}

export function circleRectangleCollision(cx, cy, cr, rx, ry, rw,rh) {
  const closestX = clamp(cx, rx, rx + rw);
  const closestY = clamp(cy, ry, ry + rh);
  const distanceSquared = distSq(cx, cy, closestX, closestY);

  return distanceSquared < cr**2
    ? [closestX, closestY]
    : false;
}

