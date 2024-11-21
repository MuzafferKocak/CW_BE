"use strict";
/* -------------------------------------------------------
    EXPRESSJS - MIDDLEWARES
------------------------------------------------------- */

/* ------------------------------------------------------- *

const middleFunc1 = (req, res, next)=>{
    console.log("MiddleFunc1 run");
    req.message1 = "middleFunc1 run"
    next()
    
}

const middleFunc2 = (req, res, next)=>{
    console.log("MiddleFunc2 run");
    req.message2 = "middleFunc2 run"
    next()
}

// module.exports = [middleFunc1,middleFunc2]
module.exports = {middleFunc1,middleFunc2}

/* ------------------------------------------------------- */

module.exports = {

    middleFunc1: (req, res, next) => {

        console.log('middleFunc1 run.')
        req.message1 = 'middleFunc1 run.'
        next()
    
    }, 

    middleFunc2: (req, res, next) => {

        console.log('middleFunc2 run.')
        req.message2 = 'middleFunc2 run.'
        next()
    
    }, 

}




