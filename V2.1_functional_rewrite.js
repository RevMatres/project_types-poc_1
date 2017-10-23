
// SETUP THE CANVAS
const canvas = document.getElementById("c1")
const ctx = canvas.getContext("2d")
canvas.height = 500
canvas.width = 500

// CONFIG
const interval = 1

// HOISTING
let pointerX, pointerY
let strokeIntervalId
let pointBuffer = []
class Point {
  constructor(x,y){
    this.x = x
    this.y = y
  }
}

// EVENT LISTENERS
canvas.addEventListener('mousemove', getPointerPosition)
canvas.addEventListener('mousedown', beginStroke)
canvas.addEventListener('mouseup', endStroke)
canvas.addEventListener('mouseout', endStroke)

// FUNCTIONS
function getPointerPosition(event){
  pointerX = event.pageX - canvas.offsetLeft
  pointerY = event.pageY - canvas.offsetTop
}

function beginStroke(){
  // add first point of the stroke
  addPoint()
  drawPoint()

  recordPoints()
}

function recordPoints(){
  // set Interval to add points in
  strokeIntervalId = setInterval(() => {
    let lastPoint = pointBuffer[pointBuffer.length-1]

    // check if pointer position has changed
    if(pointerX != lastPoint.x || pointerY != lastPoint.y){
      addPoint()
      drawPoint()
      drawLine()
    }
  }, interval)
}

function endStroke(){
  // to stop recording points, stop the Interval in which points are added
  clearInterval(strokeIntervalId)
}
function addPoint(){
  pointBuffer.push(
    new Point(pointerX, pointerY)
  )
}

function drawPoint(){
  let lastPoint = pointBuffer[pointBuffer.length-1]

  // draw the point on the canvas
  ctx.beginPath()
  ctx.fillStyle = "rgba(0,0,0,0.1)"
  ctx.arc(lastPoint.x, lastPoint.y, 10, 0, 2*Math.PI)
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
}

function drawLine(){
  let lastPoint = pointBuffer[pointBuffer.length-1]
  let secondLastPoint = pointBuffer[pointBuffer.length-2]

  // draw the line on the canvas
  ctx.beginPath()
  ctx.moveTo(secondLastPoint.x, secondLastPoint.y)
  ctx.lineTo(lastPoint.x, lastPoint.y)
  ctx.stroke()
  ctx.closePath()
}
