 export function roundTo(num, place) {
    return Math.round(num * Math.pow(10, place)) / Math.pow(10, place);
  }

  export function randomRange(min, max) {
    return min + Math.random() * (max - min);
  }

  export function randomInt(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
  }

  export function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
  }

