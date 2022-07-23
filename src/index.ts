//'use strict';
import express from 'express';

const app = express();
const port = 4000;
import path = require('path');
const imagePath = (directPath: string): string => {
  const imageSrc = path.join(__dirname, directPath);
  return imageSrc;
};

import uploadImage = require('sharp');
const resizeImage=()=>{
  
}
const transformImage = async (
  width: string,
  height: string,
  filename: string,
  res: express.Response
) => {
  try {
    const upload = await uploadImage(imagePath(`./assets/${filename}.jpg`))
      .resize(parseInt(width), parseInt(height))
      .toFile(imagePath(`./thumb/${filename}_thumb.jpg`));
    const imageSrc = imagePath(`./thumb/${filename}_thumb.jpg`);
    res.sendFile(imageSrc);
  } catch (error) {
    console.error('error', 'you must write filename and width and height');
    res.send(`<h1>you must write filename and width and height</h1>`);
  }
};
app.get(
  '/image/:filename?:width?:height?',
  (req: express.Request, res: express.Response) => {
    const width: string = req.query.width as string;
    const height: string = req.query.height as string;
    const filename: string = req.query.filename as string;

    transformImage(width, height, filename, res);
  }
);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

export default { app, transformImage };
