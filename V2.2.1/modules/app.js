
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

import { drawingCanvas } from "./drawingCanvas.js"
import { bezierPoint, simplePoint } from "./bezier.js"

/*
 * Note: both in canvas.js and in bezier.js a Point class is defined.
 * This doesn't lead to conflict though, since the Point class from canvas.js
 * isn't exported from the module and therefore private to it.
 */

// =============================================================================

/*
 *  Setup a few canvas elements
 */

let canvas1 = new drawingCanvas("c1", 500, 500, 100)
let canvas2 = new drawingCanvas("c2", 500, 500, 10)
let canvas3 = new drawingCanvas("c3", 500, 500, 1)
let canvas4 = new drawingCanvas("c4", window.innerHeight, window.innerWidth, 1)
let bezierTestCanvas = new drawingCanvas("c5", 500, 500, 1)

// Canvas is in pixels, this is a pixel scaling factor
let unit = 30

let points1 = [
  new bezierPoint(1*unit,1*-unit),
  new bezierPoint(2*unit,4*-unit),
  new bezierPoint(6*unit,4*-unit),
  new bezierPoint(7*unit,1*-unit)
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
  new bezierPoint(9*unit,1*-unit),
  new bezierPoint(13*unit,1*-unit)
]
let p1 = new simplePoint(9*unit,-50*-unit)
let p2 = new simplePoint(13*unit,-50*-unit)
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
