//'use strict';
import express from 'express';

const app = express();
const port = 8000;
import ImageFile from './utilities/interface/interface';

import path = require('path');

const imagePath = (directPath: string): string => {
  const imageSrc = path.join(__dirname, directPath);
  return imageSrc;
};
import uploadImage = require('sharp');
const resizeImage = ({ filename, width, height }: ImageFile) => {
  const upload = uploadImage(imagePath(`assets/${filename}.jpg`))
    .resize({ width: parseInt(width), height: parseInt(height) })
    .toFile(imagePath(`thumb/${filename}_thumb.jpg`));
  return upload;
};
const transformImage = async ({ width, height, filename, res }: ImageFile) => {
  try {
    const upload = await resizeImage({ filename, width, height });
    const imageSrc = imagePath(`thumb/${filename}_thumb.jpg`);
    if (res) {
      res.sendFile(imageSrc);
    }
  } catch (error) {
    console.error(
      'error',
      'you must write filename and width and height or image not found',
      imagePath(`thumb/${filename}_thumb.jpg`)
    );
    if (res) {
      res.send(`<h1>you must write filename and width and height or image not found</h1>`);
    }
  }
};
app.get(
  '/image/:filename?:width?:height?',
  (req: express.Request, res: express.Response) => {
    const width: string = req.query.width as string;
    const height: string = req.query.height as string;
    const filename: string = req.query.filename as string;

    transformImage({ width, height, filename, res });
  }
);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

export default { app, resizeImage };
