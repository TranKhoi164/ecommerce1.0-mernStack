"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../accountManagement/middleware/auth.middleware"));
const subCategory_ctrl_1 = __importDefault(require("./subCategory.ctrl"));
const subCategoryRoutes = (0, express_1.Router)();
const subCategoryCtrl = new subCategory_ctrl_1.default();
const authMiddleware = new auth_middleware_1.default();
subCategoryRoutes.post('/create_sub_category', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, subCategoryCtrl.createSubCategory);
subCategoryRoutes.delete('/delete_sub_category', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, subCategoryCtrl.deleteSubCategory);
subCategoryRoutes.get('/sub_category_list', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, subCategoryCtrl.getSubCategoryList);
exports.default = subCategoryRoutes;
