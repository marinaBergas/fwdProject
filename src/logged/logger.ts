import express from "express";
const logger = ((req:express.Request,res:express.Response,next:Function):void=>{
    const url =req.params.title;
console.log(`url visited ${url}`);
next();
})

export default logger;