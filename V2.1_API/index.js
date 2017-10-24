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
    // setup variables
    this.pointerX
    this.pointerY
    this.pointBuffer = []
    this.strokeIntervalId
    this.interval = updateInterval

    // setup canvas
    this.canvas = document.getElementById(id.toString())
    this.ctx = this.canvas.getContext("2d")

    // run setup methods
    this.setStyles(height, width)
    this.addEventListeners()
  }

  setStyles(height, width){
    this.canvas.height = height
    this.canvas.width = width
    this.canvas.style.height = height
    this.canvas.style.width = width
  }

  addEventListeners(){
    this.canvas.addEventListener('mousemove', ev => this.getPointerPosition(ev))
    this.canvas.addEventListener('mousedown', ev => this.beginStroke())
    this.canvas.addEventListener('mouseup', ev => this.endStroke())
    this.canvas.addEventListener('mouseout', ev => this.endStroke())
  }

  getPointerPosition(event){
    this.pointerX = event.pageX - this.canvas.offsetLeft
    this.pointerY = event.pageY - this.canvas.offsetTop
  }

  beginStroke(){
    // add first point of the stroke
    this.addPoint()
    this.drawPoint()

    this.recordPoints()
  }

  recordPoints(){
    // set Interval to add points in
    this.strokeIntervalId = setInterval(() => {
      let lastPoint = this.pointBuffer[this.pointBuffer.length-1]

      // check if pointer position has changed
      if(this.pointerX != lastPoint.x || this.pointerY != lastPoint.y){
          this.addPoint()
          this.drawPoint()
          this.drawLine()
      }
    }, this.interval)
  }

  endStroke(){
    // to stop recording points, stop the Interval in which points are added
    clearInterval(this.strokeIntervalId)
  }

  addPoint(){
    this.pointBuffer.push(
      new Point(this.pointerX, this.pointerY)
    )
  }

  drawPoint(){
    let lastPoint = this.pointBuffer[this.pointBuffer.length-1]

    // draw the point on the canvas
    this.ctx.beginPath()
    this.ctx.fillStyle = "rgba(0,0,0,0.1)"
    this.ctx.arc(lastPoint.x, lastPoint.y, 10, 0, 2*Math.PI)
    this.ctx.fill()
    this.ctx.stroke()
    this.ctx.closePath()
  }

  drawLine(){
    let lastPoint = this.pointBuffer[this.pointBuffer.length-1]
    let secondLastPoint = this.pointBuffer[this.pointBuffer.length-2]

    // draw the line on the canvas
    this.ctx.beginPath()
    this.ctx.moveTo(secondLastPoint.x, secondLastPoint.y)
    this.ctx.lineTo(lastPoint.x, lastPoint.y)
    this.ctx.stroke()
    this.ctx.closePath()
  }
}

// =============================================================================

//
//  Exports
//




/***/ })
/******/ ]);