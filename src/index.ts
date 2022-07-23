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
const transformImage = async (
  width: string,
  height: string,
  filename: string,
  res: express.Response
) => {
  await uploadImage(path.join(__dirname, `./assets/${filename}.jpg`))
    .resize(parseInt(width), parseInt(height))
    .toFile(path.join(__dirname, `./thumb/${filename}_thumb.jpg`));
  const imageSrc = path.join(__dirname, `./thumb/${filename}_thumb.jpg`);
  const image = res.sendFile(imageSrc);
};
app.get(
  "/image/:filename?:width?:height?",
  (req: express.Request, res: express.Response) => {
    let width: string = req.query.width as string;
    let height: string = req.query.height as string;
    let filename: string = req.query.filename as string;
    transformImage(width, height, filename, res);
  }
);

app.listen(port, () => {
  console.log(`listening on http://localhost:${port}`);
});

export default { app, transformImage };
