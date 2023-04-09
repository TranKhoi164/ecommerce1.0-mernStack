import { Router } from "express";
import AuthMiddleware from "../accountManagement/middleware/auth.middleware";
import OrderCtrl from "./order.controller";

const orderRoutes = Router()
const orderCtrl = new OrderCtrl()
const authMiddleware = new AuthMiddleware()

orderRoutes.post('/create_order', authMiddleware.authUserMiddleware, orderCtrl.createOrder)
// prodcutRoutes.get('/category_list', authMiddleware.authUserMiddleware,  authMiddleware.authAdminMiddleware, productCtrl.getCategoryList)
orderRoutes.get('/order_infor/:order_id', authMiddleware.authUserMiddleware, orderCtrl.getOrderInfor)
orderRoutes.get('/purchased_order', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, orderCtrl.getPurchasedOrder)

orderRoutes.patch('/update_order', authMiddleware.authUserMiddleware, orderCtrl.updateOrder)
orderRoutes.delete('/delete_order', authMiddleware.authUserMiddleware, orderCtrl.deleteOrder)

export default orderRoutes