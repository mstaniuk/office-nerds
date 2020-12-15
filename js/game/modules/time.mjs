export const time = {
  lastTime: 0,
  gameTime: 0,
  dt: 0,
}

export function update() {
  const now = Date.now();
  time.dt = (now - time.lastTime) / 1000.0;
  time.lastTime = now;
  time.gameTime += time.dt;
}

export function init() {
  time.lastTime = Date.now();
}
