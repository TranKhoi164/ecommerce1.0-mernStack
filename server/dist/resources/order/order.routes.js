"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../accountManagement/middleware/auth.middleware"));
const order_controller_1 = __importDefault(require("./order.controller"));
const orderRoutes = (0, express_1.Router)();
const orderCtrl = new order_controller_1.default();
const authMiddleware = new auth_middleware_1.default();
orderRoutes.post('/create_order', authMiddleware.authUserMiddleware, orderCtrl.createOrder);
// prodcutRoutes.get('/category_list', authMiddleware.authUserMiddleware,  authMiddleware.authAdminMiddleware, productCtrl.getCategoryList)
orderRoutes.get('/order_infor/:order_id', authMiddleware.authUserMiddleware, orderCtrl.getOrderInfor);
orderRoutes.get('/purchased_order', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, orderCtrl.getPurchasedOrder);
orderRoutes.patch('/update_order', authMiddleware.authUserMiddleware, orderCtrl.updateOrder);
orderRoutes.delete('/delete_order', authMiddleware.authUserMiddleware, orderCtrl.deleteOrder);
exports.default = orderRoutes;
