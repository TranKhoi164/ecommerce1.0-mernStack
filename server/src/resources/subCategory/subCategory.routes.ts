import { Router } from "express";
import AuthMiddleware from "../accountManagement/middleware/auth.middleware";
import SubCategoryCtrl from "./subCategory.ctrl";

const subCategoryRoutes = Router()
const subCategoryCtrl = new SubCategoryCtrl()
const authMiddleware = new AuthMiddleware()

subCategoryRoutes.post('/create_sub_category', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, subCategoryCtrl.createSubCategory)
subCategoryRoutes.delete('/delete_sub_category', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, subCategoryCtrl.deleteSubCategory)
subCategoryRoutes.get('/sub_category_list', authMiddleware.authUserMiddleware,  authMiddleware.authAdminMiddleware, subCategoryCtrl.getSubCategoryList)
export default subCategoryRoutes