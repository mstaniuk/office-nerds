let pressedKeys = {};

function setKey(e, status) {
  const code = e.keyCode;
  let key = '';

  switch (code) {
    case 32:
      key = 'SPACE';
      break;
    case 37:
      key = 'LEFT';
      break;
    case 38:
      key = 'UP';
      break;
    case 39:
      key = 'RIGHT';
      break;
    case 40:
      key = 'DOWN';
      break;
    default:
      // Convert ASCII codes to letters
      key = String.fromCharCode(code);
  }

  pressedKeys[key] = status;
}

document.addEventListener('keydown', function (e) {
  setKey(e, true);
});

document.addEventListener('keyup', function (e) {
  setKey(e, false);
});

window.addEventListener('blur', function () {
  pressedKeys = {};
});

export function isKeyDown(key) {
  return pressedKeys[key.toUpperCase()];
}
