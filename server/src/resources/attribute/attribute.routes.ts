import { Router } from "express";
import AuthMiddleware from "../accountManagement/middleware/auth.middleware";
import AttributeCtrl from "./attribute.ctrl";
import { getAttributesMiddleware } from "./attribute.middleware";

const attributeRoutes = Router()
const attributeCtrl = new AttributeCtrl()
const authMiddleware = new AuthMiddleware()

attributeRoutes.post('/create_attribute', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, attributeCtrl.createAttribute)
attributeRoutes.delete('/delete_attribute', authMiddleware.authUserMiddleware, authMiddleware.authAdminMiddleware, attributeCtrl.deleteAttribute)
attributeRoutes.patch('/add_attribute_value', authMiddleware.authUserMiddleware,  authMiddleware.authAdminMiddleware, attributeCtrl.addAttributeValue)
attributeRoutes.patch('/delete_attribute_value', authMiddleware.authUserMiddleware,  authMiddleware.authAdminMiddleware, attributeCtrl.deleteAttributeValue)
attributeRoutes.get('/attribute_list', getAttributesMiddleware, attributeCtrl.getAttributeList)

export default attributeRoutes