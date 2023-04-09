"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../accountManagement/middleware/auth.middleware"));
const product_ctrl_1 = __importDefault(require("./product.ctrl"));
const product_middleware_1 = require("./product.middleware");
const productRoutes = (0, express_1.Router)();
const productCtrl = new product_ctrl_1.default();
const authMiddleware = new auth_middleware_1.default();
productRoutes.get('/get_products', productCtrl.getProducts);
productRoutes.post('/get_products_detail', productCtrl.getProductsDetail);
productRoutes.get('/get_product/:product_sku', product_middleware_1.getProductHttpCache, productCtrl.getProduct);
productRoutes.post('/create_product', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, productCtrl.createProduct);
productRoutes.delete('/delete_product', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, productCtrl.deleteProduct);
exports.default = productRoutes;
