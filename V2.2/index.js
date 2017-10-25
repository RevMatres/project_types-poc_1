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
    this.pointBuffer = []
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
    this.recordPoints = recordPoints.bind(this)
    this.endStroke = endStroke.bind(this)
    this.addPoint = addPoint.bind(this)
    this.drawPoint = drawPoint.bind(this)
    this.drawLine = drawLine.bind(this)
    this.lastPointIndex = lastPointIndex.bind(this)
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
  // add first point of the stroke
  this.addPoint(0)
  this.drawPoint(0)

  this.recordPoints()
}

function recordPoints(){
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

function endStroke(){
  // clear pointBuffer
  this.pointBuffer = []

  // to stop recording points, stop the Interval in which points are added
  clearInterval(this.strokeIntervalId)
}

function addPoint(optionalIndex = false){

  // handle custom index
  if(optionalIndex !== false){
    this.pointBuffer[optionalIndex] = new Point(this.pointerX, this.pointerY)

    // to avoid adding Points twice accidentally
    return
  }

  switch(this.pointBuffer.length){
    // one Point in buffer: only the stroke's first Point has been added
    case 1:
      // add second Point
      this.pointBuffer.push(new Point(this.pointerX, this.pointerY))
      break
    // two Points in buffer: only the first two Points have been added
    case 2:
      // add third Point
      this.pointBuffer.push(new Point(this.pointerX, this.pointerY))
      break
    // three Points in buffer: the buffer is full
    case 3:
      this.pointBuffer[0] = this.pointBuffer[1]
      this.pointBuffer[1] = this.pointBuffer[2]
      this.pointBuffer[2] = new Point(this.pointerX, this.pointerY)
      break
  }

  /**   EXPLANATION FOR CASE 3
   *
   * The buffer works as follows:
   *  [ oldestPoint, middlePoint, newestPoint ]
   *  [          p1,          p2,          p3 ]
   *
   * How p4 is added:
   *    p1 is removed, p2 is moved to [0]
   *  [          p2,          p2,          p3 ]
   *    p3 is moved to [1]
   *  [          p2,          p3,          p3 ]
   *    p4 is added
   *  [          p2,          p3,          p4 ]
   *
   * New state compared to old state:
   *  [          p2,          p3,          p4 ] new
   *  [          p1,          p2,          p3 ] old
   *
  **/

}

// =============================================================================

//
//  Canvas drawing Functions
//

function drawPoint(pointIndex = false){
  // last Point in pointBuffer depending on pointBuffer's length
  let lastPoint = this.pointBuffer[this.lastPointIndex()]

  // handle custom point index
  if(pointIndex !== false){
    lastPoint = this.pointBuffer[pointIndex]
  }

  // draw the point on the canvas
  this.ctx.beginPath()
  this.ctx.fillStyle = "rgba(0,0,0,0.1)"
  this.ctx.arc(lastPoint.x, lastPoint.y, 10, 0, 2*Math.PI)
  this.ctx.fill()
  this.ctx.stroke()
  this.ctx.closePath()
}

function drawLine(){
  // last two Points in pointBuffer depending on pointBuffer's length
  let lastPoint = this.pointBuffer[this.lastPointIndex()]
  let secondLastPoint = this.pointBuffer[this.lastPointIndex()-1]

  // draw the line on the canvas
  this.ctx.beginPath()
  this.ctx.moveTo(secondLastPoint.x, secondLastPoint.y)
  this.ctx.lineTo(lastPoint.x, lastPoint.y)
  this.ctx.stroke()
  this.ctx.closePath()
}

// =============================================================================

//
//  Helpers
//

// returns index of last Point in pointBuffer
function lastPointIndex(){
  return this.pointBuffer.length-1
}
/**
* Purpose of lastPointIndex():
*  drawPoint() and drawStroke() always need to use the last two Points
*  in pointBuffer.
*   If there are only two Points in pointBuffer they need to use
*   the Points [0] and [1]. If the buffer is full, they need to use
*   the Points [1] and [2].
*
*  By using the Points [lastPointIndex()] and [lastPointIndex()-1] the functions
*  get the right Points independently from pointBuffer's length.
**/

// =============================================================================

//
//  Exports
//




/***/ })
/******/ ]);