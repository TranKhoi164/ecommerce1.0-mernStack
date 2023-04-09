"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const categoryModel = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true
    },
    slug: String,
    page: {
        type: ObjectId,
        ref: 'page'
    },
    subPage: {
        type: ObjectId,
        ref: 'subPage'
    },
    subCategories: [
        {
            type: ObjectId,
            ref: 'subCategory'
        }
    ],
});
const Categories = mongoose_1.default.model('category', categoryModel);
exports.default = Categories;
