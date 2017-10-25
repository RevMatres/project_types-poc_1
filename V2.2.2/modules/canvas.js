
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
  // this.drawPoint()
  // set Interval to add points in
  this.strokeIntervalId = setInterval(() => {
    this.drawLine()
    // this.drawPoint()
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

function drawPoint(){
  this.ctx.beginPath()
  this.ctx.fillStyle = "rgba(0,0,0,0.1)"
  this.ctx.arc(this.pointerX, this.pointerY, 10, 0, 2*Math.PI)
  this.ctx.fill()
  this.ctx.stroke()
  this.ctx.closePath()
}

function drawLine(){
  this.ctx.lineTo(this.pointerX, this.pointerY)
  this.ctx.stroke()
}

// =============================================================================

//
//  Exports
//

export { Canvas }
