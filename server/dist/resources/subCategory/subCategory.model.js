"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const subCategoryModel = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    slug: String,
    subPage: {
        type: ObjectId,
        ref: 'SubPage'
    },
    category: {
        type: ObjectId,
        ref: 'Category',
    }
});
const SubCategories = mongoose_1.default.model('subCategory', subCategoryModel);
exports.default = SubCategories;
