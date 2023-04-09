"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const inventoryModel = new mongoose_1.default.Schema({
    sku: {
        type: String,
        unique: true,
    },
    product: {
        type: ObjectId,
        ref: 'product'
    },
    attribute: Object,
    quantity: {
        type: Number,
        min: [0, 'Không đủ sản phẩm trong kho'],
    },
    price: Number,
    image: String
});
const Inventories = mongoose_1.default.model('inventory', inventoryModel);
exports.default = Inventories;
