/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__canvas_js__ = __webpack_require__(1);

//
//
//    APP.JS
//    this file interacts with the API specified in canvas.js
//
//

// =============================================================================

//
//  Imports
//



// =============================================================================

//
//  Setup a few canvas elements
//

let canvas1 = new __WEBPACK_IMPORTED_MODULE_0__canvas_js__["a" /* Canvas */]("c1", 500, 500, 100)
let canvas2 = new __WEBPACK_IMPORTED_MODULE_0__canvas_js__["a" /* Canvas */]("c2", 500, 500, 10)
let canvas3 = new __WEBPACK_IMPORTED_MODULE_0__canvas_js__["a" /* Canvas */]("c3", 500, 500, 1)
let canvas4 = new __WEBPACK_IMPORTED_MODULE_0__canvas_js__["a" /* Canvas */]("c4", window.innerHeight, window.innerWidth, 1)


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Canvas; });

//
//
//    CANVAS.JS
//    contains the Canvas Class
//
//

// =============================================================================

//
//  Define Classes
//

class Point {
  constructor(x, y){
    this.x = x
    this.y = y
  }
}

class Canvas {

  constructor(id, height, width, updateInterval){
    this.addVariables(id, updateInterval)
    this.bindMethods()
    // Note: this is handled by methods to keep the Class declaration concise

    this.setStyles(height, width)

    this.addEventListeners()
  }

  // defines and initialises required properties of the Canvas class
  addVariables(id, updateInterval){
    this.pointerX
    this.pointerY
    this.lastPoint
    this.strokeIntervalId
    this.interval = updateInterval

    // initialise canvas variables
    this.canvas = document.getElementById(id.toString())
    this.ctx = this.canvas.getContext("2d")
  }

  // binds all required methods to the Canvas class
  bindMethods(){
    this.setStyles = setStyles.bind(this)
    this.addEventListeners = addEventListeners.bind(this)
    this.getPointerPosition = getPointerPosition.bind(this)
    this.beginStroke = beginStroke.bind(this)
    this.endStroke = endStroke.bind(this)
    this.drawLine = drawLine.bind(this)
  }

}

// =============================================================================

//
//  Canvas Setup Functions
//

function setStyles(height, width){
  this.canvas.height = height
  this.canvas.width = width
  this.canvas.style.height = height
  this.canvas.style.width = width
}

function addEventListeners(){
  this.canvas.addEventListener('mousemove', ev => this.getPointerPosition(ev))
  this.canvas.addEventListener('mousedown', ev => this.beginStroke())
  this.canvas.addEventListener('mouseup', ev => this.endStroke())
  this.canvas.addEventListener('mouseout', ev => this.endStroke())
}

// =============================================================================

//
//  Stroke recording Functions
//

/**
 * These functions record and draw strokes
 */

function getPointerPosition(event){
  this.pointerX = event.pageX - this.canvas.offsetLeft
  this.pointerY = event.pageY - this.canvas.offsetTop
}

function beginStroke(){
  // add stroke's first Point to buffer
  this.lastPoint = new Point(this.pointerX, this.pointerY)

  // set Interval to add points in
  this.strokeIntervalId = setInterval(() => {
    // if change in position occured
    if(this.lastPoint.x != this.pointerX || this.lastPoint.y != this.pointerY){
      // draw line from lastPoint to the new position
      this.drawLine()

      // put new position in lastPoint
      this.lastPoint = new Point(this.pointerX, this.pointerY)
    }
  }, this.interval)
}

function endStroke(){
  // to stop recording points, stop the Interval in which points are added
  clearInterval(this.strokeIntervalId)
}

// =============================================================================

//
//  Canvas drawing Functions
//

function drawLine(){
  this.ctx.beginPath()
  // set styles
  this.ctx.lineWidth = 10
  this.ctx.lineCap = "butt"
  this.ctx.strokeStyle = "rgba(0,0,0,0.1)"

  // move to lastPoint
  this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y)
  /**
    * This needs to be done manually, because the path is limited to drawLine()
    * If the path isn't limited to drawLine(), the path contains the whole stroke.
    * That leads to mistakes with the stroke
   **/

  // draw a line to new position
  this.ctx.lineTo(this.pointerX, this.pointerY)
  this.ctx.stroke()
  this.ctx.closePath()

}

// =============================================================================

//
//  Exports
//




/***/ })
/******/ ]);