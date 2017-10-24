
// GET THE CANVAS
  // I'm doing this with consts cause I really want to, and right now it's not a component of ReactJS so it doesn't matter
const canvas = document.getElementById("c1")
const ctx = canvas.getContext("2d")
canvas.height = 500
canvas.width = 500


// GET THE CURSOR POSITION
let pointerX, pointerY
canvas.onmousemove = function(event){
  pointerX = event.pageX - this.offsetLeft
  pointerY = event.pageY - this.offsetTop

  // RUN THE DRAW LOOP
  draw()
}
  // canvas.onmousemove defines an eventlistener - of sorts     -->     LOOK UP HOW EXACTLY THIS THING WORKS, AND HOW EVENTS AND EVENT HANDLING WORKS
  // event is an Event Object with certain properties
  // since its type is a mousemove it has offset properties for the pointer


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

  // make it loop ... nicely
  // window.requestAnimationFrame(draw)

}

// window.requestAnimationFrame(draw)
// setInterval(()=>draw(),1)
