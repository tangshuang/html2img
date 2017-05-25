(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("html2canvas"), require("downloadjs"));
	else if(typeof define === 'function' && define.amd && define.cmd)
		define(["html2canvas", "downloadjs"], factory);
	else if(typeof exports === 'object')
		exports["html2img"] = factory(require("html2canvas"), require("downloadjs"));
	else
		root["html2img"] = factory(root["html2canvas"], root["downloadjs"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _html2canvas = __webpack_require__(1);
	
	var _html2canvas2 = _interopRequireDefault(_html2canvas);
	
	var _downloadjs = __webpack_require__(2);
	
	var _downloadjs2 = _interopRequireDefault(_downloadjs);
	
	var _styledDom = __webpack_require__(3);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Html2img = function () {
	    function Html2img() {
	        _classCallCheck(this, Html2img);
	    }
	
	    _createClass(Html2img, null, [{
	        key: 'canvas',
	        value: function canvas(el, options, factory) {
	            if (typeof el === 'string') {
	                el = document.querySelector(el);
	            }
	            var type = options.type || 'png';
	            var filename = (options.name || 'download') + '.' + type;
	            var filetype = 'image/' + type;
	
	            // build styles
	            var classNames = options.classNames || ['background-color', 'box-sizing', 'color', 'display', 'font-family', 'font-size', 'line-height', 'overflow-x', 'overflow-y', 'opacity', 'shape-rendering', 'text-anchor', 'text-size-adjust', 'stroke', 'stroke-width', 'fill'];
	            (0, _styledDom.buildStyledDOM)(el, {
	                classNames: classNames,
	                pseudo: options.pseudo
	            });
	
	            // background-color
	            var bgDefault = el.style.backgroundColor;
	            el.style.backgroundColor = options.backgroundColor || '#ffffff';
	
	            options.width = options.width || el.offsetWidth;
	            options.height = options.height || el.offsetHeight;
	            options.onrendered = function (canvas) {
	                // reset backgroundColor
	                el.style.backgroundColor = bgDefault;
	
	                if (typeof options.before === 'function') {
	                    options.before(el, canvas);
	                }
	
	                factory(canvas, filename, filetype);
	
	                if (typeof options.after === 'function') {
	                    options.after(el, canvas);
	                }
	            };
	
	            if (typeof options.init === 'function') {
	                options.init(el, options);
	            }
	
	            (0, _html2canvas2.default)(el, options);
	            return this;
	        }
	    }, {
	        key: 'base64',
	        value: function base64(el, options, factory) {
	            this.canvas(el, options, function (canvas, filename, filetype) {
	                var dataurl = canvas.toDataURL(filetype);
	                factory(dataurl, filename, filetype);
	            });
	            return this;
	        }
	    }, {
	        key: 'blob',
	        value: function blob(el, options, factory) {
	            this.canvas(el, options, function (canvas, filename, filetype) {
	                canvas.toBlob(function (blob) {
	                    return factory(blob, filename, filetype);
	                }, 'image/' + filetype, 1);
	            });
	            return this;
	        }
	    }, {
	        key: 'save',
	        value: function save(el, options) {
	            this.base64(el, options, _downloadjs2.default);
	            return this;
	        }
	    }, {
	        key: 'copy',
	        value: function copy(el, options) {
	            return this;
	        }
	    }]);
	
	    return Html2img;
	}();
	
	exports.default = Html2img;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.getComputedCssText = getComputedCssText;
	exports.buildStyledElement = buildStyledElement;
	exports.buildStyledDOM = buildStyledDOM;
	exports.getStyledHtml = getStyledHtml;
	// import {getFontFace} from './font-face'
	
	function getComputedCssText(el) {
	    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	    var pseudo = options.pseudo || null;
	    var computedStyles = window.getComputedStyle(el, pseudo);
	    var classNames = options.classNames || [];
	    var defaultCssText = options.defaultCssText || el.style.cssText;
	    var cssText = '';
	    classNames.forEach(function (property) {
	        var value = computedStyles.getPropertyValue(property);
	        value = value.replace('"', '\'');
	        cssText += property + ':' + value + ';';
	    });
	    if (defaultCssText !== '' && defaultCssText !== cssText) {
	        cssText = defaultCssText + cssText;
	    }
	    return cssText;
	}
	
	// export function buildSvgFontFace(el, options) {
	//     var fontFamilys = []
	//     var textElements = el.querySelectorAll('text')
	//     textElements.forEach(item => {
	//         let textComputedStyles = window.getComputedStyle(item, null)
	//         let familys = textComputedStyles.getPropertyValue('font-family')
	//         familys = familys.split(',')
	//         if(familys.length === 0) return
	//         familys.forEach(item => {
	//             let name = item.trim().replace(/"|'/g, '')
	//             let cssText = getFontFace(name)
	//             if(cssText) {
	//                 fontFamilys.push(cssText)
	//             }
	//         })
	//     })
	//
	//     if(fontFamilys.length === 0) return
	//
	//     var defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs')
	//     el.insertBefore(defs, el.firstElementChild)
	//
	//     var style = document.createElementNS('http://www.w3.org/2000/svg', 'style')
	//     style.setAttribute('type', 'text/css')
	//     defs.appendChild(style)
	//
	//     var styleTextContent = fontFamilys.join('')
	//     var styleTextNode = document.createTextNode(styleTextContent)
	//     style.append(styleTextNode)
	// }
	
	function buildStyledElement(el, options) {
	    var defaultCssText = el.style.cssText;
	    el.setAttribute('default-style', defaultCssText);
	
	    var stylesText = getComputedCssText(el, options);
	    el.style.cssText = stylesText;
	
	    // if(el.tagName === 'svg') {
	    //     buildSvgFontFace(el, options)
	    // }
	
	    var svgElements = options.svgElements || ['svg', 'g', 'path', 'line', 'circle', 'rect', 'text', 'tspan', 'style'];
	    if (options.pseudo && svgElements.indexOf(el.tangName) === -1) {
	        options.pseudo = ':before';
	        var beforeStylesText = getComputedCssText(el, options);
	        var before = document.createElement('span');
	        before.className = 'pseudo-element';
	        before.style.cssText = beforeStylesText;
	        el.insertBefore(before, el.firstChild);
	
	        options.pseudo = ':after';
	        var afterStylesText = getComputedCssText(el, options);
	        var after = document.createElement('span');
	        after.className = 'pseudo-element';
	        after.style.cssText = afterStylesText;
	        el.appendChild(after);
	    }
	}
	
	function buildStyledDOM(el, options) {
	    if (el.children.length > 0) for (var i = 0, len = el.children.length; i < len; i++) {
	        var child = el.children[i];
	        buildStyledDOM(child, options);
	    }
	    buildStyledElement(el, options);
	}
	
	// export function buildSvgTextNode(el, options) {
	//     var pseudo = options.pseudo || null
	//     var classNames = options.classNames || []
	//     var parentNode = el.parentNode
	//     var treeNodes = [parentNode, el]
	//     var styles = {}
	//     for(let i = 0; parentNode.tagName !== 'svg' && parentNode.tagName !== 'BODY' && i < 100; i ++) {
	//         parentNode = parentNode.parentNode
	//         treeNodes.unshift(parentNode)
	//     }
	//
	//     treeNodes.forEach(item => {
	//         var computedStyles = window.getComputedStyle(item, pseudo)
	//         classNames.forEach(property => {
	//             let value = computedStyles.getPropertyValue(property)
	//             if(styles[property] !== value) {
	//                 styles[property] = value
	//             }
	//         })
	//     })
	// }
	
	function getStyledHtml(el, options) {
	    buildStyledDOM(el, options);
	    return el.outerHTML;
	}

/***/ })
/******/ ])
});
;
//# sourceMappingURL=html2img.js.map