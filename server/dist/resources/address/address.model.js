"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const addressModel = new mongoose_1.default.Schema({
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