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
const path = require("path");
const imagePath = (filename) => {
    const imageSrc = path.join(__dirname, `./assets/${filename}.jpg`);
    return imageSrc;
};
const uploadImage = require("sharp");
app.get("/image/:filename?:width?:height?", (req, res) => {
    let width = req.query.width;
    let height = req.query.height;
    let filename = req.query.filename;
    const imageSrc = imagePath(filename);
    const image = res.sendFile(imageSrc);
    transformImage(width, height, filename);
});
const transformImage = (width, height, filename) => __awaiter(void 0, void 0, void 0, function* () {
    const imageSrc = imagePath(filename);
    yield uploadImage(imageSrc)
        .resize(parseInt(width), parseInt(height))
        .toFile(`src/thumb/${filename}_thumb.jpg`, (error, info) => {
        console.log(error, info);
    });
});
app.listen(port, () => {
    console.log(`listening on http://localhost:${port}`);
});
exports.default = { app, transformImage };
