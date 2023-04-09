"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../accountManagement/middleware/auth.middleware"));
const page_controller_1 = __importDefault(require("./page.controller"));
const page_middleware_1 = require("./page.middleware");
const pageRoutes = (0, express_1.Router)();
const authMiddleware = new auth_middleware_1.default();
const pageController = new page_controller_1.default();
pageRoutes.get('/page_list', page_middleware_1.getPagesMiddleware, pageController.getPageList);
pageRoutes.post('/create_page', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, pageController.createPage);
pageRoutes.delete('/delete_page', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, pageController.deletePage);
exports.default = pageRoutes;
