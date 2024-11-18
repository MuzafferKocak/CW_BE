"use strict"
//* console.log("nodejs server");

const http = require("node:http")

// http.createServer((request,response)=>{

// })
/*----------------------------------------*/
//? Server olustur
// http.createServer((req,res)=>{
//     console.log("serverdasin");
//         res.end("hello FS")
//      })

/*----------------------------------------*/
//? Gelen istekleri dinlemeye basla
// const app = http.createServer((req,res)=>{
//     console.log("serverdasin");
//         res.end("<h1>hello FS</h1>")
//      })
// app.listen(8000, "127.0.0.1")

const app = http.createServer((req,res)=>{
    console.log("serverdasin");
        res.end("<h1>hello FS</h1>")
     }).listen(8000, "127.0.0.1")

/*----------------------------------------*/
/*----------------------------------------*/
/*----------------------------------------*/
/*----------------------------------------*/
/*----------------------------------------*/