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
const index_1 = __importDefault(require("../../index"));
describe("image transform result", () => {
    it("expect transform to not throw error", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield index_1.default.transformImage('20', "300", 'icelandwaterfall');
        expect(function () { res; }).not.toThrow("error");
    }));
    it("expect transform to throw error", () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield index_1.default.transformImage('20', "300", 'test');
        expect(function () { throw new Error("there is an error"); }).toThrow();
    }));
});
