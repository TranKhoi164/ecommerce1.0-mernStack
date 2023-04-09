"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const subPageModel = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    categories: [
        {
            type: ObjectId,
            ref: 'category',
        }
    ],
    page: {
        type: ObjectId,
        required: true,
        ref: 'page'
    },
    slug: String,
    description: String
});
const SubPages = mongoose_1.default.model('subPage', subPageModel);
exports.default = SubPages;
