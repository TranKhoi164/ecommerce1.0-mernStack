"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const orderManagementModel = new mongoose_1.default.Schema({
    account: {
        type: ObjectId,
        ref: 'account',
        unique: true
    },
    orders: [
        {
            type: ObjectId,
            ref: 'order',
        }
    ]
});
const ProductManagement = mongoose_1.default.model('orderManagement', orderManagementModel);
exports.default = ProductManagement;
