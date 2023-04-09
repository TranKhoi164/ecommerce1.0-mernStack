import { Router } from "express";
import AuthMiddleware from "../accountManagement/middleware/auth.middleware";
import CategoryCtrl from "./category.ctrl";

const categoryRoutes = Router()
const categoryCtrl = new CategoryCtrl()
const authMiddleware = new AuthMiddleware()

categoryRoutes.post('/create_category', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, categoryCtrl.createCategory)
categoryRoutes.delete('/delete_category', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, categoryCtrl.deleteCategory)
categoryRoutes.get('/category_list', authMiddleware.authUserMiddleware,  authMiddleware.authAdminMiddleware, categoryCtrl.getCategoryList)

export default categoryRoutes