"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const ratingModel = new mongoose_1.default.Schema({
    starRating: {
        type: Number,
        required: 'Chưa có đánh giá'
    },
    comment: String,
    images: [],
    product: {
        type: ObjectId,
        ref: 'product',
        required: true,
    },
    account: {
        type: ObjectId,
        ref: 'account',
        required: true,
    },
    inventory: {
        type: ObjectId,
        ref: 'inventory',
    }
}, {
    timestamps: true
});
const Ratings = mongoose_1.default.model('rating', ratingModel);
exports.default = Ratings;
