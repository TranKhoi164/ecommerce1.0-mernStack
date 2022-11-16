"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controllers_1 = __importDefault(require("./account.controllers"));
const route = (0, express_1.Router)();
const accountCtrl = new account_controllers_1.default();
route.get('/information', accountCtrl.getAccountInformation);
route.patch('/update', accountCtrl.updateAccount);
route.post('/forgot_password', accountCtrl.userForgotPassword);
route.post('/reset_password', accountCtrl.userResetPassword);
exports.default = route;
