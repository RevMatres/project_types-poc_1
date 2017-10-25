
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
import { bezierPoint } from "./bezier.js"

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

let unit = 50

let points = [
  new bezierPoint(1*unit,1*-unit),
  new bezierPoint(2*unit,4*-unit),
  new bezierPoint(6*unit,4*-unit),
  new bezierPoint(7*unit,1*-unit)
]

points[0].run([points[0],points[1]])
points[1].run([points[0],points[2]])
points[2].run([points[1],points[3]])
points[3].run([points[2], null])

/*
 * WRITE A MARKDOWN FILE ON THE BEZIER.JS API
 */

bezierTestCanvas.ctx.beginPath()
bezierTestCanvas.ctx.translate(0, bezierTestCanvas.canvas.height)
bezierTestCanvas.ctx.moveTo(points[0].x, points[0].y)
bezierTestCanvas.ctx.bezierCurveTo(
  points[0].cp2.x, points[0].cp2.y,
  points[1].cp1.x, points[1].cp1.y,
  points[1].x, points[1].y
)
bezierTestCanvas.ctx.bezierCurveTo(
  points[1].cp2.x, points[1].cp2.y,
  points[2].cp1.x, points[2].cp1.y,
  points[2].x, points[2].y
)
bezierTestCanvas.ctx.bezierCurveTo(
  points[2].cp2.x, points[2].cp2.y,
  points[3].cp1.x, points[3].cp1.y,
  points[3].x, points[3].y
)
bezierTestCanvas.ctx.lineWidth = 15
bezierTestCanvas.ctx.stroke()
bezierTestCanvas.ctx.closePath()
