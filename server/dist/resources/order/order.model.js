"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const orderModel = new mongoose_1.default.Schema({
    inventory: {
        type: ObjectId,
        ref: 'inventory',
    },
    account: {
        type: ObjectId,
        ref: 'account'
    },
    isRated: {
        type: Number,
        default: 0,
    },
    status: String,
    quantity: Number,
    payment: String,
    shippingAddress: {
        type: ObjectId,
        ref: 'address'
    }
}, {
    timestamps: true
});
const Orders = mongoose_1.default.model('order', orderModel);
exports.default = Orders;
