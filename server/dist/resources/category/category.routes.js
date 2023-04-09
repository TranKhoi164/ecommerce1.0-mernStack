"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../accountManagement/middleware/auth.middleware"));
const category_ctrl_1 = __importDefault(require("./category.ctrl"));
const categoryRoutes = (0, express_1.Router)();
const categoryCtrl = new category_ctrl_1.default();
const authMiddleware = new auth_middleware_1.default();
categoryRoutes.post('/create_category', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, categoryCtrl.createCategory);
categoryRoutes.delete('/delete_category', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, categoryCtrl.deleteCategory);
categoryRoutes.get('/category_list', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, categoryCtrl.getCategoryList);
exports.default = categoryRoutes;
