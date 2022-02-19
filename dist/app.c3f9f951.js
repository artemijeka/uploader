// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/bytes-to-size.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bytesToSize = bytesToSize;

function bytesToSize(bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  if (!bytes) return '0 Byte';
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
},{}],"js/create-element.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createElement = createElement;

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function createElement(tag) {
  var classes = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var content = arguments.length > 2 ? arguments[2] : undefined;
  var element = document.createElement(tag);

  if (classes.length) {
    var _element$classList;

    (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(classes)); //Spread оператор раскладывает массивы строчкой

  }

  if (content) {
    element.textContent = content;
  }

  return element;
}
},{}],"js/uploader.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.uploader = uploader;

var _bytesToSize = require("./bytes-to-size.js");

var _createElement = require("./create-element.js");

function uploader(selector) {
  var _options$onUpload;

  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var arrFiles = [];

  function noop() {}

  ;
  var onUpload = (_options$onUpload = options.onUpload) !== null && _options$onUpload !== void 0 ? _options$onUpload : noop;
  var uploaderInput = document.querySelector(selector);
  var openBtn = (0, _createElement.createElement)('button', ['uploader__btn', '--o'], 'Открыть');
  uploaderInput.insertAdjacentElement('afterend', openBtn);
  var previewImages = (0, _createElement.createElement)('div', ['uploader__preview']);
  openBtn.insertAdjacentElement('afterend', previewImages);
  var uploadBtn = (0, _createElement.createElement)('button', ['uploader__btn', '--upload', '--hidden'], 'Загрузить');
  openBtn.insertAdjacentElement('afterend', uploadBtn);

  if (options.multi) {
    uploaderInput.setAttribute('multiple', true);
  }

  if (options.accept && Array.isArray(options.accept)) {
    uploaderInput.setAttribute('accept', options.accept.join(','));
  }

  var triggerUploaderInput = function triggerUploaderInput() {
    uploaderInput.click();
  };

  var handlerChangeUploaderInput = function handlerChangeUploaderInput(event) {
    if (!event.target.files.length) {
      //если нет файлов
      return; //то ничего не делаем
    }

    previewImages.innerHTML = '';
    arrFiles = Array.from(event.target.files);
    arrFiles.forEach(function (file) {
      if (!file.type.match('image')) {
        //работаем только с изображениями
        return;
      }

      var reader = new FileReader();

      reader.onload = function (e) {
        previewImages.insertAdjacentHTML('afterbegin', "\n          <div class=\"uploader__preview-item\">\n            <button class=\"uploader__preview-item-remove\" data-file-name=\"".concat(file.name, "\">&times;</button>\n            <img src=\"").concat(e.target.result, "\" alt=\"").concat(file.name, "\" class=\"uploader__preview-item-img\">\n            <div class=\"uploader__preview-item-title\"><p>").concat(file.name, "</p><p>").concat((0, _bytesToSize.bytesToSize)(file.size), "</p></div>\n          </div>\n        "));
      };

      reader.readAsDataURL(file);
    });
    uploadBtn.classList.remove('--hidden');
  };

  var handlerRemoveImage = function handlerRemoveImage(event) {
    var fileName;

    if (fileName = event.target.dataset.fileName) {
      arrFiles = arrFiles.filter(function (file) {
        return file.name !== fileName;
      });

      if (!arrFiles.length) {
        uploadBtn.classList.add('--hidden');
      }

      var previewItem = previewImages.querySelector("[data-file-name=\"".concat(fileName, "\"]")).closest('.uploader__preview-item');
      previewItem.classList.add('--removing');
      setTimeout(function () {
        previewItem.remove();
      }, 300);
    } else {
      return; //если не происходит присваивание имени файла то ничего не обрабатываем
    }
  };

  var clearPreviewImagesTitles = function clearPreviewImagesTitles(el) {
    el.insertAdjacentHTML('afterend', "<div class=\"uploader__preview-item-progress\"></div>");
    el.remove();
  };

  var handlerUploadImages = function handlerUploadImages() {
    previewImages.querySelectorAll('.uploader__preview-item-remove').forEach(function (el) {
      el.remove();
    });
    var previewImagesTitleAll = previewImages.querySelectorAll('.uploader__preview-item-title');
    previewImagesTitleAll.forEach(clearPreviewImagesTitles);
    onUpload(arrFiles);
  };

  openBtn.addEventListener('click', triggerUploaderInput);
  uploaderInput.addEventListener('change', handlerChangeUploaderInput);
  previewImages.addEventListener('click', handlerRemoveImage);
  uploadBtn.addEventListener('click', handlerUploadImages);
}
},{"./bytes-to-size.js":"js/bytes-to-size.js","./create-element.js":"js/create-element.js"}],"js/app.js":[function(require,module,exports) {
"use strict";

var _uploader = require("./uploader.js");

// import { initializeApp, firebase } from "firebase/app";
// import 'firebase/storage';
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries
// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDXony1MZlCKbI_Z2SC3i0h804Pqk_XAg8",
//   authDomain: "uploader-abb1e.firebaseapp.com",
//   projectId: "uploader-abb1e",
//   storageBucket: "uploader-abb1e.appspot.com",
//   messagingSenderId: "82863010551",
//   appId: "1:82863010551:web:222cc3d58ee364a632d9f2"
// };
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const storage = firebase.storage();
// console.log(storage);
(0, _uploader.uploader)('#uploaderFile', {
  multi: true,
  accept: ['.jpg', '.jpeg', '.png', '.gif', '.webp'],
  onUpload: function onUpload(files) {
    files.forEach(function (file) {// const ref = storage.ref(`images/${file.name}`);
      // const task = ref.put(file);
      // task.on('state_changed', snapshot => {
      //   const percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //   console.log(percentage);
      // }, error => {
      //   console.log(error);
      // }, () => {
      //   console.log('Complete');
      // });
    });
  }
});
},{"./uploader.js":"js/uploader.js"}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46851" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/app.js"], null)
//# sourceMappingURL=/app.c3f9f951.js.map