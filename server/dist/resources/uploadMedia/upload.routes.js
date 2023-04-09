"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../accountManagement/middleware/auth.middleware"));
const upload_controller_1 = __importDefault(require("./upload.controller"));
const uploadController = new upload_controller_1.default();
const authMiddleware = new auth_middleware_1.default();
const uploadRoutes = (0, express_1.Router)();
uploadRoutes.post('/upload_avatar', authMiddleware.authUserMiddleware, uploadController.uploadAvatar);
uploadRoutes.post('/upload_product_image', authMiddleware.authAdminMiddleware, authMiddleware.authUserMiddleware, uploadController.uploadProductImage);
uploadRoutes.delete('/delete_images', authMiddleware.authUserMiddleware, uploadController.deleteImages);
exports.default = uploadRoutes;
