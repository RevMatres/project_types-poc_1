
// SETUP THE CANVAS
const canvas = document.getElementById("c1")
const ctx = canvas.getContext("2d")
canvas.height = 1500
canvas.width = 1500


// CONFIG
const interval = 1


// EXPLANATION
/*
    - canvas.mousemove event listener gets the pointer position at any point in time, if the pointer is above the canvas
    - canvas.mousedown event listener starts a stroke
      - stroke means, that the pointer position is checked for changes in a set Interval
      - detected changes are added to pointBuffer and a new line segment is drawn
    - canvas.mouseup and canvas.mouseout to end a stroke
      - end means, that the Interval is cleared
*/


// HOISTING
let pointerX, pointerY
let strokeIntervalId
let mousePressed = false
let pointBuffer = []
class Point {
  constructor(x,y){
    this.x = x
    this.y = y
  }
}


// FUNCTIONS
function setPointerPos(ev){
  pointerX = ev.pageX - this.offsetLeft
  pointerY = ev.pageY - this.offsetTop
}

function beginStroke(){
  // add pointer position from stroke's beginning to pointBuffer
  pointBuffer.push( new Point(pointerX, pointerY) )
  drawPoint()

  // set Interval to check for movement
  strokeIntervalId = setInterval(() => {
    let l = pointBuffer.length

    // if movement occured, add new pointer position to pointBuffer
    if(pointerX != pointBuffer[l-1].x || pointerY != pointBuffer[l-1].y){
      pointBuffer.push( new Point(pointerX, pointerY) )
      drawPoint()
      drawLine()
    }
  }, interval)
}

function endStroke(){
  // if the stroke ends, end the Interval
  clearInterval(strokeIntervalId)
}

function drawLine(){
  let l = pointBuffer.length
  let a = pointBuffer[l-2].x
  let b = pointBuffer[l-2].y
  let {x, y} = pointBuffer[l-1]

  ctx.beginPath()
  ctx.moveTo(a,b)
  ctx.lineTo(x,y)
  ctx.stroke()
  ctx.closePath()
}


// EVENT LISTENERS
canvas.addEventListener('mousemove', setPointerPos)
canvas.addEventListener('mousedown', beginStroke)
canvas.addEventListener('mouseup', endStroke)
canvas.addEventListener('mouseout', endStroke)


// DEBUGGING FUNCTIONS
function drawPoint(){
  let {x, y} = pointBuffer[pointBuffer.length-1]

  ctx.beginPath()
  ctx.fillStyle = "rgba(0,0,0,0.1)"
  ctx.arc(x, y, 10, 0, 2*Math.PI)
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
}
