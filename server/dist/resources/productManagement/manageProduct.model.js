"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const manageProductModel = new mongoose_1.default.Schema({
    account: {
        type: ObjectId,
        ref: 'account',
    },
    orders: [
        {
            type: ObjectId,
            ref: 'order',
        }
    ]
});
const ManageProducts = mongoose_1.default.model('manageProduct', manageProductModel);
exports.default = ManageProducts;
