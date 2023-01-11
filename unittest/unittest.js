import assert from 'assert'

//var assert = require('../node_modules/assert')

const  HopeTests  = []
let HopePass = 0 
let HopeFail = 0 
let HopeError = 0

const hopeThat = (message,callback)=>{
     HopeTests.push([message,callback])
}

const main = () =>{
    HopeTests.forEach( ([message ,test])=>{
        try {
            test()
            HopePass ++;
        }
        catch(e) {
            if (e instanceof assert.AssertionError) {
                HopeFail ++
            }
            else {
                HopeError++
            }
        }
    })

    console.log(`pass: ${HopePass}`)
    console.log(`fail: ${HopeFail}`)
    console.log(`error: ${HopeError}`)
}

const sign = (value)=>{
    if(value<0){ return -1 } 
    else{ return 1}
}

hopeThat(' Sign of negative is -1', ()=>assert(sign(-3)===-1))
hopeThat(' Sign of positive is 1', ()=>assert(sign(19)===1))
hopeThat(' Sign of zero is 0', ()=>assert(sign(0)===0))
hopeThat(' Sign misspelled is error ', ()=>assert(sgn(1)===1))

main()