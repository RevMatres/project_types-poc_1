function printProduct(factor){
  console.log("the number is: ", this.number)
  console.log("the product of number with: ", factor, "is: ", this.number*factor)
}

let object = {
  number: 4
}

// printProduct.call(object, 2)



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

// printMultipleProducts.apply(object, [2, 4, 5, 7])

// output:
// the product of Number and:  2 is:  8
// the product of Number and:  4 is:  16
// the product of Number and:  5 is:  20
// the product of Number and:  7 is:  28


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
