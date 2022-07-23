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
//'use strict';
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = 8000;
const path = require("path");
const imagePath = (directPath) => {
    const imageSrc = path.join(__dirname, directPath);
    return imageSrc;
};
const uploadImage = require("sharp");
const resizeImage = ({ filename, width, height }) => {
    const upload = uploadImage(imagePath(`assets/${filename}.jpg`))
        .resize({ width: parseInt(width), height: parseInt(height) })
        .toFile(imagePath(`thumb/${filename}_thumb.jpg`));
    return upload;
};
const transformImage = ({ width, height, filename, res }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const upload = yield resizeImage({ filename, width, height });
        const imageSrc = imagePath(`thumb/${filename}_thumb.jpg`);
        if (res) {
            res.sendFile(imageSrc);
        }
    }
    catch (error) {
        console.error('error', 'you must write filename and width and height', imagePath(`thumb/${filename}_thumb.jpg`));
        if (res) {
            res.send(`<h1>you must write filename and width and height</h1>`);
        }
    }
});
app.get('/image/:filename?:width?:height?', (req, res) => {
    const width = req.query.width;
    const height = req.query.height;
    const filename = req.query.filename;
    transformImage({ width, height, filename, res });
});
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
exports.default = { app, resizeImage };
