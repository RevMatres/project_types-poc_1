
// GET THE CANVAS
  // I'm doing this with consts cause I really want to, and right now it's not a component of ReactJS so it doesn't matter
const canvas = document.getElementById("c1")
const ctx = canvas.getContext("2d")
canvas.height = 500
canvas.width = 500


// GET THE CURSOR POSITION
let pointerX, pointerY

// define setter function
function setPointerPos(mouseMove){
  pointerX = mouseMove.pageX - this.offsetLeft
  pointerY = mouseMove.pageY - this.offsetTop
}

// add eventListener
canvas.addEventListener('mousemove',setPointerPos)


// DEFINE A DRAW LOOP
function draw() {
  // clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // draw point at cursor position
  ctx.beginPath()
  ctx.fillStyle = "rgba(250,0,0,0.25)"
  ctx.arc(pointerX, pointerY, 8, 0, 2*Math.PI)
  ctx.fill()
  ctx.closePath()

  // loop
  drawLoop = window.requestAnimationFrame(draw)
}


// RUN THE DRAW LOOP
let mousePressed
let clearRect = () => {ctx.clearRect(0, 0, canvas.width, canvas.height)}
let cancelRequest = () => {window.cancelAnimationFrame(drawLoop)}
  // those last two are for repetition-avoidance

// draw on the canvas, stop when leaving the canvas
canvas.addEventListener('mousedown',() => {
  drawLoop = window.requestAnimationFrame(draw)
})
canvas.addEventListener('mouseup',() => {
  cancelRequest()
  clearRect()
})
canvas.addEventListener('mouseleave',() => {
  cancelRequest()
  clearRect()
})

// if mousedown occurs outside the canvas and the cursor then enters, still draw
document.addEventListener('mousedown',() => {
  mousePressed = true
})
document.addEventListener('mouseup',() => {
  mousePressed = false
})
canvas.addEventListener('mouseover',() => {
  if(mousePressed){
    drawLoop = window.requestAnimationFrame(draw)
  }
})
