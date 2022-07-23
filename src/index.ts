// "use strict";
import express from "express";

const app = express();
const port = 4000;
const path = require("path");
const fs = require("fs");
const url = require("url");

const imagePath = (filename: string): string => {
  const imageSrc = path.join(__dirname, `./assets/${filename}.jpg`);

  return imageSrc;
};

const uploadImage = require("sharp");
const resizeImage = async (
  width: string,
  height: string,
  filename: string,
  res: express.Response
) => {
  await uploadImage(path.join(__dirname, `./assets/${filename}.jpg`))
    .resize(parseInt(width), parseInt(height))
    .toFile(path.join(__dirname, `./resizedImage/${filename}.jpg`));
  const imageSrc = path.join(__dirname, `./resizedImage/${filename}.jpg`);
  const image = res.sendFile(imageSrc);
  transformImage(width, height, filename);
};
app.get(
  "/image/:filename?:width?:height?",
  (req: express.Request, res: express.Response) => {
    let width: string = req.query.width as string;
    let height: string = req.query.height as string;
    let filename: string = req.query.filename as string;
    resizeImage(width, height, filename, res);
  }
);

const transformImage = async (
  width: string,
  height: string,
  filename: string
) => {
  const imageSrc = imagePath(filename);
  await uploadImage(imageSrc)
    .resize(parseInt(width), parseInt(height))
    .toFile(`src/thumb/${filename}_thumb.jpg`);
};
app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

export default { app, transformImage };
