"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
const account_controllers_1 = __importDefault(require("./controllers/account.controllers"));
const auth_middleware_1 = __importDefault(require("./middleware/auth.middleware"));
const jwt_controller_1 = __importDefault(require("./controllers/jwt.controller"));
const jwt_middleware_1 = __importDefault(require("./middleware/jwt.middleware"));
const authCtrl = new auth_controller_1.default();
const accountCtrl = new account_controllers_1.default();
const accountMiddleware = new auth_middleware_1.default();
const jwtMiddleware = new jwt_middleware_1.default();
const jwt = new jwt_controller_1.default();
const accountRoutes = (0, express_1.Router)();
//  /account/...
//auth routes
accountRoutes.post('/register', accountMiddleware.registerMiddleware, authCtrl.userRegister);
accountRoutes.post('/login', authCtrl.userLogin);
accountRoutes.get('/active_account', accountMiddleware.activeAccountMiddleware, authCtrl.activeAccountWithEmail);
accountRoutes.post('/logout', authCtrl.userLogout);
//account manipulation routes 
accountRoutes.get('/information', accountCtrl.getAccountInformation);
accountRoutes.patch('/update', accountCtrl.updateAccount);
accountRoutes.post('/forgot_password', accountCtrl.userForgotPassword);
accountRoutes.post('/reset_password', accountCtrl.userResetPassword);
//jwtController
accountRoutes.post('/get_accesstoken', jwtMiddleware.refreshAccessTokenMiddleware, jwt.refreshAccessToken);
exports.default = accountRoutes;
