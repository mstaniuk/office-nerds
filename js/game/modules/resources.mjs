const resourceCache = {};
const readyCallbacks = [];

export function load(urlOrArr) {
  if (urlOrArr instanceof Array) {
    urlOrArr.forEach(function (url) {
      _load(url);
    });
  } else {
    _load(urlOrArr);
  }
}

function _load(url) {
  if (resourceCache[url]) {
    return resourceCache[url];
  }

  const img = new Image();

  img.onload = () => {
    resourceCache[url] = img;

    if (isReady()) {
      readyCallbacks.forEach((func) => {
        func();
      });
    }
  };

  img.onerror = () => {
    console.log(url + ' cannot be loaded');
  }

  resourceCache[url] = false;
  img.src = url;
}

export function get(url) {
  return resourceCache[url];
}

function isReady() {
  let ready = true;

  for (let k of Object.keys(resourceCache)) {
    if (!resourceCache[k]) {
      ready = false;
    }
  }
  return ready;
}

export function onReady(func) {
  readyCallbacks.push(func);
}

