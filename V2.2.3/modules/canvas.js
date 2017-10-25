
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

  // move to beginning of stroke,
  // to avoid the stroke being connected to a previous stroke


  // set Interval to add points in
  this.strokeIntervalId = setInterval(() => {
    // if change in position occured
    if(this.lastPoint.x != this.pointerX || this.lastPoint.y != this.pointerY){
      this.drawLine()

      // record new position
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

  // move to last position
  this.ctx.moveTo(this.lastPoint.x, this.lastPoint.y)
  // draw a line to new position
  this.ctx.lineTo(this.pointerX, this.pointerY)
  this.ctx.stroke()
  this.ctx.closePath()

}

// =============================================================================

//
//  Exports
//

export { Canvas }
