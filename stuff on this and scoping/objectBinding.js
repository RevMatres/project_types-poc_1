function log(){let a=arguments;console.log(...a)}

//
// BEHAVIOUR OF THIS
//

// 1. Functions

/*
    Functions don't really have their own 'this'. They refer to another Object's this.

    A function call DOESN'T set the function's 'this'.
    Functions are defined in global scope.

    Because of that, a function's 'this' usually defaults to the global Object.
    In strict-mode a function's 'this' will default to undefined.

    In Browsers the global Object is 'window', in NodeJS it's 'global'.

*/

function printValue(){
  log(this.value)
}

global.value = "This comes from GLOBAL"
printValue()    // output: This comes from GLOBAL

function localScope(){
  printValue()
}
localScope()    // output: This comes from GLOBAL



// 2. Arrow Functions

/*
    Arrow functions don't really have their own 'this' either. They refer to another object's 'this', too. [However, they do it more like Rust's lambdas, which access to their outer scope]

    A function call DOESN'T set the function's 'this'. Same for Arrow Functions.
    The arrow function's 'this' is set upon definition.

    It's set to the "enclosing lexical context's this", which is the next higher scope's 'this'.

    Arrow functions assigned to a variable are defined in global scope.
    Arrow functions assigned as a method are defined in the object's scope, to which the enclosing lexical context is the global scope. That's why a arrow-function method still has the global Object as 'this'.

    Only if one goes two levels down in the lexical scope, an arrow function doesn't have the global Object as 'this'.
*/

// EXAMPLE FROM MDN
var globalObject = this
var foo = (() => this)

// call from global scope
log( foo() === globalObject )       // output: true

// call from local scope
var localObject = { foo: foo }
log( localObject.foo() === globalObject )   // output: true
// the arrow function has been assigned to the localScope,
// but it's 'this' still is global


// 3. Methods

/*
    The 'this' of a method is set to the Object the method is called on.
*/



// 4. Arrow Function Methods

let cat = {
  sound: 'meow',
  talk: function(){
    log(this)                     // 'this' is set to cat
  }
}
cat.talk()

let duck = {
  sound: 'quack',
  talk: () => {
    log( this === globalObject )  // output: true
  }
}
duck.talk()

/*
    The arrow function in duck is defined in duck's scope, duck's enclosing scope is global.
    The arrow function's 'this' is set to global.
*/


let parrot = {
  sound: 'screetch',
  talk: function(){
    let run = ()=>{log(this.sound)}
    run()
  }
}
parrot.talk()   // output: screetch

/*
    The talk method's functional block is a local scope, two levels down from global.
    The talk method's 'this' is set to parrot.
    In the local scope 'this' is equal to parrot.

    The arrow function's 'this' is set to the local scope's 'this'.
    Therefore the arrow function's 'this' is set to parrot.
*/


function localScope() {
  let a = ()=>{ log( this === globalObject ) }
  a()
}
localScope()  // output: false

/*
    The enclosing lexical scope to the arrow function is localScope's scope.
    So its 'this' is not equal to global, but to localScope's 'this'
*/


// 5. Events

/*
    addEventListener specifies a listener function.
    That function's this is set to the element the event fired from.
*/
