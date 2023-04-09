import { Router } from "express";
import AuthMiddleware from "../accountManagement/middleware/auth.middleware";
import InventoryCtrl from "./inventory.ctrl";

const inventoryRoutes = Router()
const inventoriesCtrl = new InventoryCtrl()
const authMiddleware = new AuthMiddleware()

inventoryRoutes.post('/create_inventories', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, inventoriesCtrl.createInventory)
// prodcutRoutes.get('/category_list', authMiddleware.authUserMiddleware,  authMiddleware.authAdminMiddleware, productCtrl.getCategoryList)
inventoryRoutes.patch('/update_inventory', authMiddleware.authUserMiddleware, inventoriesCtrl.updateInventory)
export default inventoryRoutes