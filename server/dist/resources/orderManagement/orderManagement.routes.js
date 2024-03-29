"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../accountManagement/middleware/auth.middleware"));
const orderManagement_ctrl_1 = __importDefault(require("./orderManagement.ctrl"));
const orderManagementRoutes = (0, express_1.Router)();
const orderManagementCtrl = new orderManagement_ctrl_1.default();
const authMiddleware = new auth_middleware_1.default();
orderManagementRoutes.get('/order_management', authMiddleware.authUserMiddleware, orderManagementCtrl.getOrderManagementInfor);
orderManagementRoutes.get('/orders_in_cart', authMiddleware.authUserMiddleware, orderManagementCtrl.getOrdersInCart);
orderManagementRoutes.get('/purchased_orders_of_account', authMiddleware.authUserMiddleware, orderManagementCtrl.getPurchasedOrdersOfAccount);
orderManagementRoutes.get('/purchased_orders', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, orderManagementCtrl.getPurchasedOrders);
orderManagementRoutes.post('/confirm_order', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, orderManagementCtrl.confirmOrder);
orderManagementRoutes.post('/cancel_order', authMiddleware.authUserMiddleware, orderManagementCtrl.cancelOrder);
orderManagementRoutes.post('/push_order/:order_id', authMiddleware.authUserMiddleware, orderManagementCtrl.pushOrder);
orderManagementRoutes.post('/purchase_orders', authMiddleware.authUserMiddleware, orderManagementCtrl.purchaseOrders);
orderManagementRoutes.delete('/remove_order/:order_id', authMiddleware.authUserMiddleware, orderManagementCtrl.removeOrder);
exports.default = orderManagementRoutes;
