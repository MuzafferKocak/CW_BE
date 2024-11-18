"use strict";
//* console.log("nodejs server");

const http = require("node:http");

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

// const app = http.createServer((req,res)=>{
//     console.log("serverdasin");
//         res.end("<h1>hello FS</h1>")
//      }).listen(8000, "127.0.0.1", ()=> console.log("server Runned http://127.0.0.1:8000"))

require("dotenv").config();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
/*----------------------------------------*
const app = http
  .createServer((req, res) => {
    if (req.url == "/") 
        if(req.method=="GET")
            res.end("<h1>Home Page</h1>");
            
        else
            res.end("<h1>You can not POST</h1>")
    else if (req.url == "/user") 
        res.end("<h1>User page</h1>");

    else 
    res.end("<h1>Undefined URL</h1>");
  })
  .listen(PORT, () => console.log(`server Runned http://${HOST}:${PORT}`));


/*----------------------------------------*
  const app= http.createServer((req, res)=>{
    if(req.url=='/' && req.method=='GET'){
        res.write('message 1 ')
        res.write('message 2 ')
        res.write('message 3 ')
    }
    else if(req.method=='POST'){
        // res.write('method POST')
        // res.statusCode=201
        // res.statusMessage='Tamam'
        res.writeHead(201,"tamam")
        res.write('method POST')
    }
        res.end()
    
}).listen(PORT,()=> console.log(`Server Runned http://${HOST}:${PORT}`))


/*----------------------------------------*/
const app= http.createServer((req, res)=>{
    
    const obj={
        chort:'FS',
        message: 'Hello'

    }
    res.end(JSON.stringify(obj))
    
}).listen(PORT,()=> console.log(`Server Runned http://${HOST}:${PORT}`))



