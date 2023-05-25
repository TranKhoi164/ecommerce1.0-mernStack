import { Router } from "express";
import AuthMiddleware from "../accountManagement/middleware/auth.middleware";
import PageController from "./page.controller";

const pageRoutes = Router()
const authMiddleware = new AuthMiddleware()
const pageController = new PageController()

pageRoutes.get('/page_list', pageController.getPageList)
pageRoutes.post('/create_page', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, pageController.createPage)
pageRoutes.delete('/delete_page', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, pageController.deletePage)


export default pageRoutes