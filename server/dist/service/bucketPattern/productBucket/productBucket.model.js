"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const productBucketModel = new mongoose_1.default.Schema({
    subPage: {
        type: ObjectId,
        ref: 'subPage',
    },
    count: {
        type: Number,
        required: true
    },
    products: [
        {
            type: ObjectId,
            ref: 'product'
        }
    ]
});
const ProductBucket = mongoose_1.default.model('productBucket', productBucketModel);
exports.default = ProductBucket;
