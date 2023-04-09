import { Router } from "express";
import AuthMiddleware from "../accountManagement/middleware/auth.middleware";
import UploadController from "./upload.controller";

const uploadController = new UploadController()
const authMiddleware = new AuthMiddleware()

const uploadRoutes = Router()

uploadRoutes.post('/upload_avatar', authMiddleware.authUserMiddleware, uploadController.uploadAvatar)
uploadRoutes.post('/upload_product_image', authMiddleware.authAdminMiddleware, authMiddleware.authUserMiddleware, uploadController.uploadProductImage)
uploadRoutes.delete('/delete_images', authMiddleware.authUserMiddleware, uploadController.deleteImages)

export default uploadRoutes