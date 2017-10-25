
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
  this.addPoint()
  this.drawPoint()

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
  // to stop recording points, stop the Interval in which points are added
  clearInterval(this.strokeIntervalId)
}

function addPoint(){
  this.pointBuffer.push(
    new Point(this.pointerX, this.pointerY)
  )
}

// =============================================================================

//
//  Canvas drawing Functions
//

function drawPoint(){
  let lastPoint = this.pointBuffer[this.pointBuffer.length-1]

  // draw the point on the canvas
  this.ctx.beginPath()
  this.ctx.fillStyle = "rgba(0,0,0,0.1)"
  this.ctx.arc(lastPoint.x, lastPoint.y, 10, 0, 2*Math.PI)
  this.ctx.fill()
  this.ctx.stroke()
  this.ctx.closePath()
}

function drawLine(){
  let lastPoint = this.pointBuffer[this.pointBuffer.length-1]
  let secondLastPoint = this.pointBuffer[this.pointBuffer.length-2]

  // draw the line on the canvas
  this.ctx.beginPath()
  this.ctx.moveTo(secondLastPoint.x, secondLastPoint.y)
  this.ctx.lineTo(lastPoint.x, lastPoint.y)
  this.ctx.stroke()
  this.ctx.closePath()
}

// =============================================================================

//
//  Exports
//

export { Canvas }
