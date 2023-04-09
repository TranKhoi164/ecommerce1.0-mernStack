import { Router } from "express";
import AuthMiddleware from "../accountManagement/middleware/auth.middleware";
import ProductManagementCtrl from "./orderManagement.ctrl";

const orderManagementRoutes = Router()
const orderManagementCtrl = new ProductManagementCtrl()
const authMiddleware = new AuthMiddleware()

orderManagementRoutes.get('/order_management', authMiddleware.authUserMiddleware, orderManagementCtrl.getOrderManagementInfor)
orderManagementRoutes.get('/orders_in_cart', authMiddleware.authUserMiddleware, orderManagementCtrl.getOrdersInCart)
orderManagementRoutes.get('/purchased_orders_of_account', authMiddleware.authUserMiddleware, orderManagementCtrl.getPurchasedOrdersOfAccount)
orderManagementRoutes.get('/purchased_orders', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, orderManagementCtrl.getPurchasedOrders)
orderManagementRoutes.post('/confirm_order', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, orderManagementCtrl.confirmOrder)
orderManagementRoutes.post('/cancel_order', authMiddleware.authUserMiddleware, orderManagementCtrl.cancelOrder)

orderManagementRoutes.post('/push_order/:order_id', authMiddleware.authUserMiddleware, orderManagementCtrl.pushOrder)
orderManagementRoutes.post('/purchase_orders', authMiddleware.authUserMiddleware, orderManagementCtrl.purchaseOrders)
orderManagementRoutes.delete('/remove_order/:order_id', authMiddleware.authUserMiddleware, orderManagementCtrl.removeOrder)


export default orderManagementRoutes