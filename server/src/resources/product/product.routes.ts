import { Router } from "express";
import AuthMiddleware from "../accountManagement/middleware/auth.middleware";
import ProductCtrl from "./product.ctrl";
import { getProductHttpCache } from "./product.middleware";

const productRoutes = Router()
const productCtrl = new ProductCtrl()
const authMiddleware = new AuthMiddleware()

productRoutes.get('/get_products', productCtrl.getProducts)
productRoutes.post('/get_products_detail', productCtrl.getProductsDetail)
productRoutes.get('/get_product/:product_sku', getProductHttpCache, productCtrl.getProduct)
productRoutes.post('/create_product', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, productCtrl.createProduct)
productRoutes.delete('/delete_product', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, productCtrl.deleteProduct)


export default productRoutes