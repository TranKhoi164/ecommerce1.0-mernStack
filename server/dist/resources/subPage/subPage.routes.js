"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../accountManagement/middleware/auth.middleware"));
const subPage_controller_1 = __importDefault(require("./subPage.controller"));
const subPageRoutes = (0, express_1.Router)();
const authMiddleware = new auth_middleware_1.default();
const subPageController = new subPage_controller_1.default();
subPageRoutes.get('/:page_slug/:subPage_slug', subPageController.getSubPageBySlug);
subPageRoutes.post('/create_sub_page', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, subPageController.createSubPage);
subPageRoutes.delete('/delete_sub_page', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, subPageController.deleteSubPage);
subPageRoutes.get('/sub_page_list/:page_id', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, subPageController.getSubPageListByPage);
subPageRoutes.get('/sub_page_list', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, subPageController.getSubPageList);
exports.default = subPageRoutes;
