
/**
 *
 *    BEZIER.JS
 *    This file defines a Point class, that implements methods to calculate bezier control points
 *
**/

// =============================================================================

/*
 *  Class definitions
 */

// defines a simple point object
class simplePoint {
  constructor(x, y){
    this.type = "simplePoint"
    this.x = x
    this.y = y
  }
}

// defines a bezier-able point
class bezierPoint extends simplePoint{
  // produce the controlPoints
  run(neighbours, bezierSmoothingStrength=1){
    this.bindMethods()
    this.setNeighbours(neighbours)
    this.calcTangent()
    this.calcControlPoints(bezierSmoothingStrength)
  }

  bindMethods(){
    this.type = "bezierPoint"
    this.checkPathBeginning = checkNullPoint.bind(this, 0)
    this.checkPathEnd = checkNullPoint.bind(this, 1)
  }

  setNeighbours(neighbours){
    // make neighbour points
    // check if they are endpoints, return simplePoint objects with neighbour's coordinates
    let prev = this.checkPathBeginning(neighbours)
    let next = this.checkPathEnd(neighbours)

    this.neighbours = [prev, next]
  }

  calcTangent(){
    // create a vector in the tangent's direction
    let tangentVector = new Vector(this.neighbours[0], this.neighbours[1])
    tangentVector.toUnitVector()

    // create tangent Line object
    this.tangent = new Line(this, tangentVector)
  }

  calcControlPoints(bezierSmoothingStrength=1){
    this.bezierSmoothingStrength = bezierSmoothingStrength

    this.cp1 = this.controlPoint(this.neighbours[0], this.neighbours[1])
    this.cp2 = this.controlPoint(this.neighbours[1], this.neighbours[0])
  }

  // returns a bezier control point with P1 and P2 being the neighbours
  controlPoint(P1, P2){
    // define segment as the vector from this bezierPoint to P2
    let segment = new Vector(this, P2)
    // then (-segment) is the vector from this bezierPoint to P2',
    // where P2' is mirrored at this bezierPoint in the direction of segment

    // multiply segment with 0.5
    segment.scalarProduct(0.5)
    // (-segment) is now the vector from this bezierPoint to P2'halfway.
    // P2'halfway lies halfways between this bezierPoint and P2'

    // control bezier smoothing effect strength
    segment.scalarProduct(this.bezierSmoothingStrength)

    // define P2half as P2'halfway
    let P2half = new simplePoint(this.x - segment.x, this.y - segment.y)

    // line from P1 to P2half=P2'halfway
    let P1toP2half = new Line(P1, P2half)

    // return intersection of (P1 to P2half) with this bezierPoint's tangent
    return lineIntersection(this.tangent, P1toP2half)

    /*
     *  Note:
     *  Control points for bezier curves are calculated using a certain method.
     *  This method is implemented in controlPoint().
     *
     *  In the Documentation for this file a Graphic will be provided,
     *  that showcases how bezier control points come to be,
     *  with the elements being named as they are in controlPoint()
     */

  }
}

// defines a vector
class Vector {
  constructor(point1, point2){
    this.type = "vector"
    this.x = point2.x - point1.x
    this.y = point2.y - point1.y
  }

  length(){
    return Math.sqrt( Math.pow(this.x, 2) + Math.pow(this.y, 2) )
  }

  toUnitVector(){
    this.x /= this.length()
    this.y /= this.length()
  }

  scalarProduct(factor){
    this.x *= factor
    this.y *= factor
  }
}

// defines a line
class Line{
  constructor(a, b){
    this.type = "line"
    this.checkCase(a, b)
  }

  // check which of the two allowed input cases is true and call appropriate function
  checkCase(a, b){
    // case: Line(Point, Vector)
    if(b.type == "vector"){
      this.PV(a, b)

    // case: Line(Point, Point)
  }else if(b.type == "simplePoint" || b.type == "bezierPoint"){
      this.PP(a, b)
    }
  }

  // PP = Point and Point; referring to the arguments
  PP(point1, point2){
    let vec = new Vector(point1, point2)
    this.PV(point1, vec)
  }

  // PV = Point and Vector; referring to the arguments
  PV(point, vector){
    this.slope = slope(vector)
    this.yIntersect = yIntersect(point, this.slope)
    this.f = function(x){ return this.slope * x + this.yIntersect }
  }
}

// =============================================================================

/*
 *  Function Definitions
 */

// lineIntersection returns the intersection Point of two lines
function lineIntersection(line1, line2){
  let x = (line1.yIntersect - line2.yIntersect)/(line2.slope - line1.slope)
  let y = line1.f(x)

  // return a point with x and y ROUNDED to 2 decimals
  return new simplePoint(Math.round(x*100)/100, Math.round(y*100)/100)
}

// return the slope of obj
// obj can be either a Vector or a Point
function slope(obj){
  return obj.y / obj.x
}

// return yIntersect of a Line through obj with slope
// obj can be either a Vector or a Point
function yIntersect(obj, slope){
  return obj.y - slope * obj.x
}

// check obj[ind] for null
// return simplePoint that is either obj[ind] or a replacement for obj[ind]=null
//  obj is an array with points
//  ind is the index to be checked
function checkNullPoint(ind, obj){
  if(obj[ind] === null){ return new simplePoint(this.x, this.y) }
  return new simplePoint(obj[ind].x, obj[ind].y)
}

// =============================================================================

/*
 *  Exports
 */

export { bezierPoint, simplePoint }

// =============================================================================

/*
 *  Tests
 */

/*
 * These tests prove, that the calculations are correct.

let A = new bezierPoint(1,2)
let B = new bezierPoint(4,4)
let C = new bezierPoint(7,4)

B.setNeighbours([A,C])
B.tangent()
B.controlPoints()

console.log('controlPoint 1: ', B.controlPoint1.x, B.controlPoint1.y)
console.log('controlPoint 2: ', B.controlPoint2.x, B.controlPoint2.y)

 */
