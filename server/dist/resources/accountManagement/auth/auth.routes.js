"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const authCtrl = new auth_controller_1.default();
const route = (0, express_1.Router)();
route.post('/register', authCtrl.userRegister);
route.post('/login', authCtrl.userLogin);
route.post('/active_account', authCtrl.activeAccountWithEmail);
route.post('/logout', authCtrl.userLogout);
exports.default = route;
