/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };

	var Wall = _interopRequire(__webpack_require__(1));

	new Wall();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _createClass = (function () { function defineProperties(target, props) { for (var key in props) { var prop = props[key]; prop.configurable = true; if (prop.value) prop.writable = true; } Object.defineProperties(target, props); } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

	var Wall = (function () {
	    function Wall() {
	        var _this = this;

	        _classCallCheck(this, Wall);

	        var windowHeight = window.innerHeight;
	        var documentHeight = document.documentElement.offsetHeight;

	        this.imagesNumber = Math.floor(this.height / 210) + 1;
	        this.wraper = document.querySelector(".wraper");
	        this.wraper.style.width = "960px";
	        this.startHeight = this.imagesNumber * 210 + "px";
	        this.wraper.style.height = this.startHeight;
	        this.appendImages(this.imagesNumber);

	        window.addEventListener("scroll", function (e) {
	            var sY = window.scrollY;
	            if (sY == documentHeight - windowHeight) {
	                var actualHeight = parseInt(_this.wraper.style.height);
	                var wantedHeight = actualHeight + sY;
	                _this.wraper.style.height = wantedHeight + "px";
	            }
	        });
	    }

	    _createClass(Wall, {
	        appendImages: {
	            value: function appendImages(number) {
	                var u = "http://placeskull.com/950/200";
	                for (var i = 0; i < number; i++) {
	                    var d = document.createElement("div");
	                    var src = u + "?" + i;
	                    var img = document.createElement("img");
	                    img.src = src;
	                    d.appendChild(img);
	                    this.wraper.appendChild(d);
	                }
	            }
	        }
	    });

	    return Wall;
	})();

	module.exports = Wall;

/***/ }
/******/ ]);