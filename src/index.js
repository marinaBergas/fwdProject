"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// "use strict";
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 4000;
const imageSrc = "/home/oie/fwd/eslint/src/assets/favicon.png";
const sharp = require("sharp");
app.get("/image/:filename?:width?:height?", (req, res) => {
    const image = res.sendFile(imageSrc);
    let width = req.query.width;
    let height = req.query.height;
    transformImage(width, height);
    // sharp(imageSrc)
    //   .resize(parseInt(width), parseInt(height))
    //   .toFile(`src/assets/image-${width}-${height}.png`, (error: unknown, info: unknown) => {
    //     console.log(error, info);
    //   });
});
const transformImage = (width, height) => __awaiter(void 0, void 0, void 0, function* () {
    yield sharp(imageSrc)
        .resize(parseInt(width), parseInt(height))
        .toFile(`src/assets/image-${width}-${height}.png`, (error, info) => {
        console.log(error, info);
    });
    // sharp(imageSrc)
    // .rotate()
    // .resize(parseInt(width), parseInt(height))
    // .jpeg({ mozjpeg: true })
    // .toBuffer()
    // .then(( info: unknown) => { console.log(info) })
    // .catch( (error: unknown) => {console.log(error) });
});
// app.get('/api',(req,res)=>{
//     res.send("hello,world");
// });
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
// import express from 'express';
// const app=express();
// const port=6000;
// app.get('/api',(req,res)=>{
//     res.send("hello,world");
// });
//  app.listen(port,()=>console.log(`listening on port ${port}`));
exports.default = { app, transformImage };
