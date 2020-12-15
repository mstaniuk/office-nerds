;(function () {
  'use strict';
  var resources = {
    resourceCache: {},
    readyCallbacks: [],
  }

  // Load an image url or an array of image urls
  resources.load = function load(urlOrArr) {
    if (urlOrArr instanceof Array) {
      urlOrArr.forEach(function (url) {
        _load(url);
      });
    } else {
      _load(urlOrArr);
    }
  }

  function _load(url) {
    if (resources.resourceCache[url]) {
      return resources.resourceCache[url];
    }

    var img = new Image();
    img.onload = function () {
      resources.resourceCache[url] = img;
      if (resources.isReady()) {
        resources.readyCallbacks.forEach(function (func) {
          func();
        });
      }
    };
    resources.resourceCache[url] = false;
    img.src = url;
  }

  resources.get = function get(url) {
    return resources.resourceCache[url];
  }

  resources.isReady = function isReady() {
    var ready = true;
    for (var k of Object.keys(resources.resourceCache)) {
      if (!resources.resourceCache[k]) {
        ready = false;
      }
    }
    return ready;
  }

  resources.onReady =function onReady(func) {
    resources.readyCallbacks.push(func);
  }

  window.Game.resources = resources;
})();
