"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const addressModel = new mongoose_1.default.Schema({
    account: {
        type: ObjectId,
        ref: 'Account',
    },
    address: {
        type: String,
        trim: true,
        required: true,
    },
    ward: {
        type: String,
        trim: true,
        required: true,
    },
    district: {
        type: String,
        trim: true,
        required: true,
    },
    province: {
        type: String,
        trim: true,
        required: true,
    },
}, {
    timestamps: true
});
const Addresses = mongoose_1.default.model('Address', addressModel);
exports.default = Addresses;
