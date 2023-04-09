"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../accountManagement/middleware/auth.middleware"));
const productManagement_ctrl_1 = __importDefault(require("./productManagement.ctrl"));
const orderManagementRoutes = (0, express_1.Router)();
const orderManagementCtrl = new productManagement_ctrl_1.default();
const authMiddleware = new auth_middleware_1.default();
orderManagementRoutes.get('/get_orders', authMiddleware.authUserMiddleware, orderManagementCtrl.getOrdersByAccountId);
orderManagementRoutes.post('/push_order/:order_id', authMiddleware.authUserMiddleware, orderManagementCtrl.pushOrder);
orderManagementRoutes.delete('/remove_order/:order_id', authMiddleware.authUserMiddleware, orderManagementCtrl.removeOrder);
exports.default = orderManagementRoutes;
