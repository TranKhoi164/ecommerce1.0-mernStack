"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const pageModel = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    subPages: [
        {
            type: ObjectId,
            ref: 'subPage',
        }
    ],
    slug: String,
});
const Pages = mongoose_1.default.model('page', pageModel);
exports.default = Pages;
