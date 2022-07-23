import express from 'express';

interface ImageFile {
  width: string;
  filename: string;
  height: string;
  res?: express.Response;
}
export default ImageFile;
