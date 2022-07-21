// "use strict";
import express from "express";

const app = express();
const port = 4000;
const path = require("path");

//  const imageSrc=path.join(__dirname, "./assets/icelandwaterfall.jpg");

const imagePath=(filename:string):string=>{
  
  const exten=['png','jpg','jpeg'];
  const imageSrc=path.join(__dirname, `./assets/${filename}.jpg`);
return imageSrc;
}

const sharp = require("sharp");
  app.get(
    "/image/:filename?:width?:height?",
    (req: express.Request, res: express.Response) => {
      let width: string = req.query.width as string;
      let height: string = req.query.height as string;
      let filename: string = req.query.filename as string;
      const imageSrc=imagePath(filename);
      const image = res.sendFile(imageSrc);

      transformImage(width,height,filename);
  
    }
  );

const transformImage=async (width:string,height:string,filename:string)=>{
  const imageSrc=imagePath(filename);
   await sharp(imageSrc)
  .resize(parseInt(width), parseInt(height))
  .toFile(`src/thumb/${filename}_thumb.jpg`, (error: unknown, info: unknown) => {
    console.log(error, info);
  });
 
}
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

export default {app,transformImage};