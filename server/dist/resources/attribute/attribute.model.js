"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const attributeModel = new mongoose_1.default.Schema({
    name: String,
    values: Array
});
const Attributes = mongoose_1.default.model('attribute', attributeModel);
exports.default = Attributes;
