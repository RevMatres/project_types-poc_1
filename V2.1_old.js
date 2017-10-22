
// GET THE CANVAS
  // I'm doing this with consts cause I really want to, and right now it's not a component of ReactJS so it doesn't matter
const canvas = document.getElementById("c1")
const ctx = canvas.getContext("2d")
canvas.height = 500
canvas.width = 500


// DEFINE A DRAW LOOP
function draw() {
  // draw point at cursor position
  ctx.beginPath()
  ctx.fillStyle = "rgba(0,0,0,0.1)"
  ctx.arc(pointerX, pointerY, 20, 0, 2*Math.PI)
  ctx.fill()
  ctx.closePath()

  // loop
  drawLoop = window.requestAnimationFrame(draw)
}


// RUN THE DRAW LOOP
let mousePressed
let cancelRequest = () => {window.cancelAnimationFrame(drawLoop)}
  // those last two are for repetition-avoidance

// draw on the canvas, stop when leaving the canvas
canvas.addEventListener('mousedown',() => {drawLoop = window.requestAnimationFrame(draw)})
canvas.addEventListener('mouseup',() => {cancelRequest()})
canvas.addEventListener('mouseleave',() => {cancelRequest()})

// if mousedown occurs outside the canvas and the cursor then enters, still draw
document.addEventListener('mousedown',() => {mousePressed = true})
document.addEventListener('mouseup',() => {mousePressed = false})
canvas.addEventListener('mouseover',() => {if(mousePressed){drawLoop = window.requestAnimationFrame(draw)}})





// GET THE POINTER POSITION
let pointerX, pointerY
let tempStorage = []
class Point {
  constructor(x,y){
    this.x = x
    this.y = y
  }
}

// define setter function
function addPointerPos(mouseMove){
  let x = mouseMove.pageX - this.offsetLeft
  let y = mouseMove.pageY - this.offsetTop
  pointerX = x
  pointerY = y
  tempStorage.push(new Point(x,y))
  console.log(tempStorage)
}

// add eventListener
canvas.addEventListener('mousemove',addPointerPos)
