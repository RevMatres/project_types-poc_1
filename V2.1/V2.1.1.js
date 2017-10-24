
// GET THE CANVAS
  // I'm doing this with consts cause I really want to, and right now it's not a component of ReactJS so it doesn't matter
const canvas = document.getElementById("c1")
const ctx = canvas.getContext("2d")
canvas.height = 500
canvas.width = 500


// HOISTING
let mousePressed = false
let pointBuffer = []
class Point {
  constructor(x,y){
    this.x = x
    this.y = y
  }
}


          // THIS STUFF WITH GETTING THE POINTER POSITION AND SUCH NEEDS TO BE REWRITTEN MORE SMARTLY -- USE SOMETHING LIKE BIND() OR SUCH

// ADD EVENT-LISTENERS
canvas.addEventListener('mousedown', mouseDownHandler)
function mouseDownHandler(ev){
  mousePressed = true

  // get the current pointer position and add it to pointBuffer
  let a = ev.pageX - this.offsetLeft
  let b = ev.pageY - this.offsetTop
  pointBuffer.push(new Point(a,b))

  // drawPoint()
}
canvas.addEventListener('mouseup', () => {mousePressed = false})
document.addEventListener('mousedown',() => {mousePressed = true})
document.addEventListener('mouseup',() => {mousePressed = false})

canvas.addEventListener('mousemove',mouseMoveHandler)
function mouseMoveHandler(ev){
  if (mousePressed) {

    // get the current pointer position and add it to pointBuffer
    let a = ev.pageX - this.offsetLeft
    let b = ev.pageY - this.offsetTop
    pointBuffer.push(new Point(a,b))

    drawLine()
    // drawPoint()
  }
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


function drawPoint(){
  let {x, y} = pointBuffer[pointBuffer.length-1]

  ctx.beginPath()
  ctx.fillStyle = "rgba(0,0,0,0.1)"
  ctx.arc(x, y, 5, 0, 2*Math.PI)
  ctx.fill()
  ctx.stroke()
  ctx.closePath()
}
