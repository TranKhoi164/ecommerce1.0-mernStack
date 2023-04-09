"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const productModel = new mongoose_1.default.Schema({
    page: {
        type: ObjectId,
        ref: 'page'
    },
    subPage: {
        type: ObjectId,
        ref: 'subPage'
    },
    category: {
        type: ObjectId,
        ref: 'category'
    },
    subCategory: {
        type: ObjectId,
        ref: 'subCategory'
    },
    name: String,
    slug: String,
    sku: {
        type: String,
        unique: true
    },
    description: String,
    attributes: Object,
    images: Array,
    detail: Object,
    price: Number,
    minPrice: Number,
    maxPrice: Number,
    inventories: [{
            type: ObjectId,
            ref: 'inventory'
        }],
}, {
    timestamps: true
});
const Products = mongoose_1.default.model('product', productModel);
exports.default = Products;
