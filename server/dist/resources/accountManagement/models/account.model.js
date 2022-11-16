"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ObjectId = new mongoose_1.default.Types.ObjectId;
const accountModel = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true,
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
        required: true
    },
    address: {
        type: ObjectId,
        ref: 'address',
    },
    fullName: {
        type: String,
        trim: true,
    },
    gender: {
        type: String
    },
    avatar: {
        type: String,
    },
    dateOfBirth: {
        type: Date
    },
    role: {
        type: Number,
    }
}, {
    timestamps: true
});
const Accounts = mongoose_1.default.model("Account", accountModel);
exports.default = Accounts;
