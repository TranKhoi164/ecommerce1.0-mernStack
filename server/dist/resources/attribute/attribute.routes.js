"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../accountManagement/middleware/auth.middleware"));
const attribute_ctrl_1 = __importDefault(require("./attribute.ctrl"));
const attribute_middleware_1 = require("./attribute.middleware");
const attributeRoutes = (0, express_1.Router)();
const attributeCtrl = new attribute_ctrl_1.default();
const authMiddleware = new auth_middleware_1.default();
attributeRoutes.post('/create_attribute', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, attributeCtrl.createAttribute);
attributeRoutes.delete('/delete_attribute', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, attributeCtrl.deleteAttribute);
attributeRoutes.patch('/add_attribute_value', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, attributeCtrl.addAttributeValue);
attributeRoutes.patch('/delete_attribute_value', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, attributeCtrl.deleteAttributeValue);
attributeRoutes.get('/attribute_list', attribute_middleware_1.getAttributesMiddleware, attributeCtrl.getAttributeList);
exports.default = attributeRoutes;
