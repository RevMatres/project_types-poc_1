# JavaScript's Lexical Function Scoping and Function's this keyword
[TOC]
## JAVASCRIPT'S SCOPING

### Lexical Scoping with Function Scope
JavaScript has Lexical Scoping with Function Scope.

#### First up, lexical scope.
Lexical Scoping means that a scope within a scope can access the outer scopes properties,
but not the properties of another scope. This creates a static "scope-inheritance" structure,
which is why Lexical Scoping is also called Static Scopint.

```javascript
function someScope(){
let b = 100
}

function localScope(){
let a = 10

  function moreLocalScope(){
    // has access to localScope's properties,
    // but not to someScope's properties
    console.log(a)  // output: 10
    console.log(b)  // output: undefined
  }
}
```

**Lexical Scoping stands in contrast to Dynamic Scoping.**

In Dynamic Scoping the function call defines dynamically the scope a function runs in.
This **DOESN'T** work in JavaScript, consider the following PSEUDO-CODE:

```javascript
function printer(){
console.log(a)
}

function scopeA(){
let a = 100
printer()         // would-be-output: 100
}
function scopeB(){
let a = 42
printer()         // would-be-output: 42
}
```

JavaScript is Lexically Scoped, so this doesn't actually work.

#### The second thing is Function Scope.
In JavaScript only a function defines a new scope. Objects don't.
In many languages curly braces define a block-scope, so Objects have their own scope.
That isn't the case in JavaScript, though. Here only functions define scopes.
```javascript
function localScope(){
// this is a local scope
}

let obj = {
// this IS NOT a local scope, this is still global
}
```


## FUNCTIONS AND THEIR THIS'


### General Functions
Functions don't have their own this.
They refer to another Object's this.
What Object they refer to is set upon definition and isn't changed by the function call.

### Regular Functions
For regular functions the rule is:
```
  this defaults to the global Object: in browsers that is window, in nodeJS that is global.
  In strict-mode this defaults to undefined, because functions don't have a this.
```
### Setting the this
If a function requires a this, that isn't the global Object, there are multiple ways to do that.

#### Using .call()
```javascript
someFunction.call(thisArg, arg1, arg2, ...)
```
someFunction is the function, whose this is to be changed.
thisArg is the Object, whose this is to be used for someFunction.
arg1, arg2, ... are the arguments, that are passed into someFunction.

```javascript
function printProduct(factor){
  console.log("the number is: ", this.number)
  console.log("the product of number with: ", factor, "is: ", this.number*factor)
}

let object = {
  number: 4
}

printProduct.call(object, 2)

  // output:
  // the number is: 4
  // the multiple of number is: 8
```

#### Using .apply()
```
someFunction.apply(thisArg, [arg1, arg2, ...])
```
someFunction is the function, whose this is to be changed.
thisArg is the Object, whose this is to be used for someFunction.
[arg1, arg2, ...] is an Array of arguments, that are passed INDIVIDUALLY to someFunction

This can be usefull, if one doesn't know how many arguments will be passed
```javascript
function printMultipleProducts(f1,f2,f3,f4){
  console.log("the Number is: ", this.number)   // output: the Number is: 4

  console.log(f1)                               // output: 2
  console.log(f2)                               // output: 4
  console.log(f3)                               // output: 5
  console.log(f4)                               // output: 7

  let factors = Array.from(arguments)
  factors.forEach(val=>{
    console.log("the product of Number and: ", val, "is: ", this.number*val)
  })
}

printMultipleProducts.apply(object, [2, 4, 5, 7])

  // output:
  // the product of Number and:  2 is:  8
  // the product of Number and:  4 is:  16
  // the product of Number and:  5 is:  20
  // the product of Number and:  7 is:  28
```

#### Using .bind()
```javascript
let boundFunction = someFunction.bind(thisArg, arg1, arg2, ...)
```
.bind() returns a new Function, that is assigned to boundFunction -- in this case.
someFunction is the function, whose this is to be bound.
thisArg is the object, whose this is to be used,

arg1, arg2, ... are preset arguments, that will be passed into boundFunction upon call.
These prepend, they come before, the arguments written in the parenthesis.

Example for binding functionality:
```javascript
let cat = {
  sound: 'meow',
  talk: function(){
    console.log(this.sound)
  }
}

let Ari = {
  sound: 'screetch-ari-dooo'
}

cat.talk()                      // output: meow

let talk = cat.talk             // == function(){ console.log(this.sound) }   --> 'this' is undefined
talk()                          // output: undefined

let ariTalk = talk.bind(Ari)    // makes talk()'s 'this' be 'Ari'
ariTalk()                       // output: screetch-ari-dooo
```

Example for prepend/preset arguments functionality:
```javascript
function logArgs(){
  let args = Array.from(arguments)
  args.forEach((val,ind)=>{
    console.log(`the ${ind}st/nd/rd/th Argument is: `, val)
  })
}

logArgs(22,3,55)
  // output:
  // the 0st/nd/rd/th Argument is:  22
  // the 1st/nd/rd/th Argument is:  3
  // the 2st/nd/rd/th Argument is:  55

let prependedLogArgs = logArgs.bind(null, 1,1,1,1)

prependedLogArgs(42,43,44)
  // output:
  // the 0st/nd/rd/th Argument is:  1
  // the 1st/nd/rd/th Argument is:  1
  // the 2st/nd/rd/th Argument is:  1
  // the 3st/nd/rd/th Argument is:  1
  // the 4st/nd/rd/th Argument is:  42
  // the 5st/nd/rd/th Argument is:  43
  // the 6st/nd/rd/th Argument is:  44
```
### Arrow Functions
Since arrow functions are functions, they also don't have their own this.
But their rules are a bit different:
```  
  An arrow function's this is set to it's "enclosing lexical context's this".
  That means an arrow function's this is set to the this of the next higher scope.
```
In most cases an arrow function's this is set to global, because of that.
