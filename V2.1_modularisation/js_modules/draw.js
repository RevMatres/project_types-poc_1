
import { getPointerPosition, beginStroke, endStroke } from "./functions.js"

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
