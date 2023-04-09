"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../accountManagement/middleware/auth.middleware"));
const inventory_ctrl_1 = __importDefault(require("./inventory.ctrl"));
const inventoryRoutes = (0, express_1.Router)();
const inventoriesCtrl = new inventory_ctrl_1.default();
const authMiddleware = new auth_middleware_1.default();
inventoryRoutes.post('/create_inventories', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, inventoriesCtrl.createInventory);
// prodcutRoutes.get('/category_list', authMiddleware.authUserMiddleware,  authMiddleware.authAdminMiddleware, productCtrl.getCategoryList)
inventoryRoutes.patch('/update_inventory', authMiddleware.authUserMiddleware, inventoriesCtrl.updateInventory);
exports.default = inventoryRoutes;
