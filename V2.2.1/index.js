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
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__drawingCanvas_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__bezier_js__ = __webpack_require__(2);

/*
 *
 *    APP.JS
 *    this file interacts with the API specified in canvas.js
 *
 */

// =============================================================================

/*
 *  Imports
 */




/*
 * Note: both in canvas.js and in bezier.js a Point class is defined.
 * This doesn't lead to conflict though, since the Point class from canvas.js
 * isn't exported from the module and therefore private to it.
 */

// =============================================================================

/*
 *  Setup a few canvas elements
 */

let canvas1 = new __WEBPACK_IMPORTED_MODULE_0__drawingCanvas_js__["a" /* drawingCanvas */]("c1", 500, 500, 100)
let canvas2 = new __WEBPACK_IMPORTED_MODULE_0__drawingCanvas_js__["a" /* drawingCanvas */]("c2", 500, 500, 10)
let canvas3 = new __WEBPACK_IMPORTED_MODULE_0__drawingCanvas_js__["a" /* drawingCanvas */]("c3", 500, 500, 1)
let canvas4 = new __WEBPACK_IMPORTED_MODULE_0__drawingCanvas_js__["a" /* drawingCanvas */]("c4", window.innerHeight, window.innerWidth, 1)
let bezierTestCanvas = new __WEBPACK_IMPORTED_MODULE_0__drawingCanvas_js__["a" /* drawingCanvas */]("c5", 500, 500, 1)

// Canvas is in pixels, this is a pixel scaling factor
let unit = 30

let points1 = [
  new __WEBPACK_IMPORTED_MODULE_1__bezier_js__["a" /* bezierPoint */](1*unit,1*-unit),
  new __WEBPACK_IMPORTED_MODULE_1__bezier_js__["a" /* bezierPoint */](2*unit,4*-unit),
  new __WEBPACK_IMPORTED_MODULE_1__bezier_js__["a" /* bezierPoint */](6*unit,4*-unit),
  new __WEBPACK_IMPORTED_MODULE_1__bezier_js__["a" /* bezierPoint */](7*unit,1*-unit)
]

points1[0].run([null, points1[1]])
points1[1].run([points1[0],points1[2]])
points1[2].run([points1[1],points1[3]])
points1[3].run([points1[2], null])

bezierTestCanvas.ctx.beginPath()
bezierTestCanvas.ctx.translate(0, bezierTestCanvas.canvas.height)
bezierTestCanvas.ctx.moveTo(points1[0].x, points1[0].y)
bezierTestCanvas.ctx.bezierCurveTo(
  points1[0].cp2.x, points1[0].cp2.y,
  points1[1].cp1.x, points1[1].cp1.y,
  points1[1].x, points1[1].y
)
bezierTestCanvas.ctx.bezierCurveTo(
  points1[1].cp2.x, points1[1].cp2.y,
  points1[2].cp1.x, points1[2].cp1.y,
  points1[2].x, points1[2].y
)
bezierTestCanvas.ctx.bezierCurveTo(
  points1[2].cp2.x, points1[2].cp2.y,
  points1[3].cp1.x, points1[3].cp1.y,
  points1[3].x, points1[3].y
)
bezierTestCanvas.ctx.lineWidth = 15
bezierTestCanvas.ctx.stroke()
bezierTestCanvas.ctx.closePath()

// =============================================================================



let points2 = [
  new __WEBPACK_IMPORTED_MODULE_1__bezier_js__["a" /* bezierPoint */](9*unit,1*-unit),
  new __WEBPACK_IMPORTED_MODULE_1__bezier_js__["a" /* bezierPoint */](13*unit,1*-unit)
]
let p1 = new __WEBPACK_IMPORTED_MODULE_1__bezier_js__["b" /* simplePoint */](9*unit,-50*-unit)
let p2 = new __WEBPACK_IMPORTED_MODULE_1__bezier_js__["b" /* simplePoint */](13*unit,-50*-unit)
points2[0].run([p1, points2[1]])
points2[1].run([points2[0], p2])

bezierTestCanvas.ctx.beginPath()
bezierTestCanvas.ctx.moveTo(points2[0].x, points2[0].y)
// bezierTestCanvas.ctx.lineTo(points2[1].x, points2[1].y)

bezierTestCanvas.ctx.moveTo(points2[0].x, points2[0].y)
bezierTestCanvas.ctx.bezierCurveTo(
  points2[0].cp2.x, points2[0].cp2.y,
  points2[1].cp1.x, points2[1].cp1.y,
  points2[1].x, points2[1].y
)
bezierTestCanvas.ctx.lineWidth = 15
bezierTestCanvas.ctx.stroke()
bezierTestCanvas.ctx.closePath()

/*
 * WRITE A MARKDOWN FILE ON THE BEZIER.JS API
 *
 * DONE  change: make bezierPoint objects aren't used anywhere within a bezierPoint object ==> check the Line() creation!
 * DONE  add: type destinction between simplePoint and bezierPoint
 *
 * add feature: custom pathEnd pseudo points with default being on the pathEnd Point
 *  point.run([pseudoHandler(x, y), neighbour])
 *    pseudoHandler(x, y) returns a simplePoint with a custom flag: returnedObject.nullPoint = true
 *    checkNullPoint() then needs to check both for just null, and for obj.nullPoint == true
 *
 * add feature: create a bezierPointsArray prototype thingie with a method to auto-run all points
 *  let p1 = bezierPointsArray([points], false)
 *  p1.run()
 *  let p2 = new bezierPointsArray([points], true) // the true is for autoRun
 * this can be done with a return function, maybe even with a class constructor that just returns the array, which is pretty pointless
 *
 * combine feature: bezierPointsArray() needs to also accept pseudoEndPoints
 *  maybe let p3 = new bezierPointsArray([bezierPoints], autoRun, [beginningPseudoPoint || null, endPseudoPoint || null])
 *
 * add feature: [points] creator function
 *  takes an array like [{x:number,y:number},{x:number,y:number},{x:number,y:number}] and makes bezierPoints from it
 *  which are acceptable in bezierPointsArray
 *
 * add feature: have bezierPointsArray() accept either an array with bezierPoint objects or an array of {x,y} objects and convert on its own
 *  this requires type destinction between simplePoint and bezierPoint
 *  don't allow for mixed arrays
 *
 * make function to draw on canvas
 *    drawBezierCurve(canvasContext, [bezierPoints], {canvasSettings})
 *
 *      canvasSettings{
 *        may include canvas translation that is undone when the function finishes
 *        may include all of the styling attributes
 *      }
 */


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return drawingCanvas; });

//
//
//    DRAWINGCANVAS.JS
//    contains the drawingCanvas Class
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

class drawingCanvas {

  constructor(id, height, width, updateInterval){
    this.addVariables(id, updateInterval)
    this.bindMethods()
    // Note: this is handled by methods to keep the Class declaration concise

    this.setStyles(height, width)

    this.addEventListeners()
  }

  // defines and initialises required properties of the drawingCanvas class
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

  // binds all required methods to the drawingCanvas class
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




/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return bezierPoint; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return simplePoint; });

/**
 *
 *    BEZIER.JS
 *    This file defines a Point class, that implements methods to calculate bezier control points
 *
**/

// =============================================================================

/*
 *  Class definitions
 */

// defines a simple point object
class simplePoint {
  constructor(x, y){
    this.type = "simplePoint"
    this.x = x
    this.y = y
  }
}

// defines a bezier-able point
class bezierPoint extends simplePoint{
  // produce the controlPoints
  run(neighbours, bezierSmoothingStrength=1){
    this.bindMethods()
    this.setNeighbours(neighbours)
    this.calcTangent()
    this.calcControlPoints(bezierSmoothingStrength)
  }

  bindMethods(){
    this.type = "bezierPoint"
    this.checkPathBeginning = checkNullPoint.bind(this, 0)
    this.checkPathEnd = checkNullPoint.bind(this, 1)
  }

  setNeighbours(neighbours){
    // make neighbour points
    // check if they are endpoints, return simplePoint objects with neighbour's coordinates
    let prev = this.checkPathBeginning(neighbours)
    let next = this.checkPathEnd(neighbours)

    this.neighbours = [prev, next]
  }

  calcTangent(){
    // create a vector in the tangent's direction
    let tangentVector = new Vector(this.neighbours[0], this.neighbours[1])
    tangentVector.toUnitVector()

    // create tangent Line object
    this.tangent = new Line(this, tangentVector)
  }

  calcControlPoints(bezierSmoothingStrength=1){
    this.bezierSmoothingStrength = bezierSmoothingStrength

    this.cp1 = this.controlPoint(this.neighbours[0], this.neighbours[1])
    this.cp2 = this.controlPoint(this.neighbours[1], this.neighbours[0])
  }

  // returns a bezier control point with P1 and P2 being the neighbours
  controlPoint(P1, P2){
    // define segment as the vector from this bezierPoint to P2
    let segment = new Vector(this, P2)
    // then (-segment) is the vector from this bezierPoint to P2',
    // where P2' is mirrored at this bezierPoint in the direction of segment

    // multiply segment with 0.5
    segment.scalarProduct(0.5)
    // (-segment) is now the vector from this bezierPoint to P2'halfway.
    // P2'halfway lies halfways between this bezierPoint and P2'

    // control bezier smoothing effect strength
    segment.scalarProduct(this.bezierSmoothingStrength)

    // define P2half as P2'halfway
    let P2half = new simplePoint(this.x - segment.x, this.y - segment.y)

    // line from P1 to P2half=P2'halfway
    let P1toP2half = new Line(P1, P2half)

    // return intersection of (P1 to P2half) with this bezierPoint's tangent
    return lineIntersection(this.tangent, P1toP2half)

    /*
     *  Note:
     *  Control points for bezier curves are calculated using a certain method.
     *  This method is implemented in controlPoint().
     *
     *  In the Documentation for this file a Graphic will be provided,
     *  that showcases how bezier control points come to be,
     *  with the elements being named as they are in controlPoint()
     */

  }
}

// defines a vector
class Vector {
  constructor(point1, point2){
    this.type = "vector"
    this.x = point2.x - point1.x
    this.y = point2.y - point1.y
  }

  length(){
    return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) )
  }

  toUnitVector(){
    this.x /= this.length()
    this.y /= this.length()
  }

  scalarProduct(factor){
    this.x *= factor
    this.y *= factor
  }
}

// defines a line
class Line{
  constructor(a, b){
    this.type = "line"
    this.checkCase(a, b)
  }

  // check which of the two allowed input cases is true and call appropriate function
  checkCase(a, b){
    // case: Line(Point, Vector)
    if(b.type == "vector"){
      this.PV(a, b)

    // case: Line(Point, Point)
  }else if(b.type == "simplePoint" || b.type == "bezierPoint"){
      this.PP(a, b)
    }
  }

  // PP = Point and Point; referring to the arguments
  PP(point1, point2){
    let vec = new Vector(point1, point2)
    this.PV(point1, vec)
  }

  // PV = Point and Vector; referring to the arguments
  PV(point, vector){
    this.slope = slope(vector)
    this.yIntersect = yIntersect(point, this.slope)
    this.f = function(x){ return this.slope * x + this.yIntersect }
  }
}

// =============================================================================

/*
 *  Function Definitions
 */

// lineIntersection returns the intersection Point of two lines
function lineIntersection(line1, line2){
  let x = (line1.yIntersect - line2.yIntersect)/(line2.slope - line1.slope)
  let y = line1.f(x)

  // return a point with x and y ROUNDED to 2 decimals
  return new simplePoint(Math.round(x*100)/100, Math.round(y*100)/100)
}

// return the slope of obj
// obj can be either a Vector or a Point
function slope(obj){
  return obj.y / obj.x
}

// return yIntersect of a Line through obj with slope
// obj can be either a Vector or a Point
function yIntersect(obj, slope){
  return obj.y - slope * obj.x
}

// check obj[ind] for null
// return simplePoint that is either obj[ind] or a replacement for obj[ind]=null
//  obj is an array with points
//  ind is the index to be checked
function checkNullPoint(ind, obj){
  if(obj[ind] === null){ return new simplePoint(this.x, this.y) }
  return new simplePoint(obj[ind].x, obj[ind].y)
}

// =============================================================================

/*
 *  Exports
 */



// =============================================================================

/*
 *  Tests
 */

/*
 * These tests prove, that the calculations are correct.

let A = new bezierPoint(1,2)
let B = new bezierPoint(4,4)
let C = new bezierPoint(7,4)

B.setNeighbours([A,C])
B.tangent()
B.controlPoints()

console.log('controlPoint 1: ', B.controlPoint1.x, B.controlPoint1.y)
console.log('controlPoint 2: ', B.controlPoint2.x, B.controlPoint2.y)

 */


/***/ })
/******/ ]);