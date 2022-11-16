"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const account_controllers_1 = __importDefault(require("./controllers/account.controllers"));
const authCtrl = new auth_controller_1.default();
const accountCtrl = new account_controllers_1.default();
const accountRoutes = (0, express_1.Router)();
//authController
accountRoutes.post('/register', authCtrl.userRegister);
accountRoutes.post('/login', authCtrl.userLogin);
accountRoutes.post('/active_account', authCtrl.activeAccountWithEmail);
accountRoutes.post('/logout', authCtrl.userLogout);
//accountController 
accountRoutes.get('/information', accountCtrl.getAccountInformation);
accountRoutes.patch('/update', accountCtrl.updateAccount);
accountRoutes.post('/forgot_password', accountCtrl.userForgotPassword);
accountRoutes.post('/reset_password', accountCtrl.userResetPassword);
//jwtController
exports.default = accountRoutes;
