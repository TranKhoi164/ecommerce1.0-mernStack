import { Router } from "express";
import AuthMiddleware from "../accountManagement/middleware/auth.middleware";
import SubPageController from "./subPage.controller";

const subPageRoutes = Router()
const authMiddleware = new AuthMiddleware()
const subPageController = new SubPageController()

subPageRoutes.get('/:page_slug/:subPage_slug', subPageController.getSubPageBySlug)
subPageRoutes.post('/create_sub_page', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, subPageController.createSubPage)
subPageRoutes.delete('/delete_sub_page', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, subPageController.deleteSubPage)
subPageRoutes.get('/sub_page_list/:page_id', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, subPageController.getSubPageListByPage)
subPageRoutes.get('/sub_page_list', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, subPageController.getSubPageList)


export default subPageRoutes