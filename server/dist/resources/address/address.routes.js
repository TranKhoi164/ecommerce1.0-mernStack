"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../accountManagement/middleware/auth.middleware"));
const address_controller_1 = __importDefault(require("./address.controller"));
const addressRoutes = (0, express_1.Router)();
const addressController = new address_controller_1.default();
const authMiddleware = new auth_middleware_1.default();
addressRoutes.post('/create_address', authMiddleware.authUserMiddleware, addressController.createNewAddress);
addressRoutes.get('/address_list', authMiddleware.authUserMiddleware, addressController.getUserAddressList);
addressRoutes.patch('/update_address/:_id', authMiddleware.authUserMiddleware, addressController.updateAddress);
addressRoutes.delete('/delete_address', authMiddleware.authUserMiddleware, addressController.deleteAddress);
exports.default = addressRoutes;
