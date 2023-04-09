"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Schema.Types;
const accountModel = new mongoose_1.default.Schema({
    username: {
        type: String,
        trim: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    fullName: {
        type: String,
        trim: true,
    },
    gender: {
        type: String,
        default: 'nam'
    },
    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/dfkkrqh2s/image/upload/v1668354385/ecommerce/avatar/Screenshot_2022-02-04_181853_u6m6cf_w3hnjo.png'
    },
    dateOfBirth: {
        type: String
    },
    role: {
        type: Number,
        default: 0
    },
    addresses: [
        {
            type: ObjectId,
            ref: 'address'
        }
    ]
});
const Accounts = mongoose_1.default.model("account", accountModel);
exports.default = Accounts;
