import { init as initializeCore } from './game/modules/core.mjs';
import { init as initializeCanvas } from './game/modules/canvas.mjs';
import { load as loadResources, onReady as onResourcesReady} from './game/modules/resources.mjs';

loadResources([
  'img/panda.png',
  'img/nerf.png',
  'img/hit.png',
  'img/stars.png',
  'img/map.png',
  'img/office.png',
  'img/office_fg.png',
  'img/player.png',
  'img/explosion.png',
]);


document.addEventListener('DOMContentLoaded', function (e) {
  initializeCanvas();

  onResourcesReady(() => {
    initializeCore();
  });
});

