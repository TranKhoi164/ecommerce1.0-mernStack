"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const cartModel = new mongoose_1.default.Schema({
    account: {
        type: ObjectId,
        unique: true,
    },
    orders: [
        {
            type: ObjectId,
            ref: 'order',
        }
    ]
});
const Carts = mongoose_1.default.model('cart', cartModel);
exports.default = Carts;
