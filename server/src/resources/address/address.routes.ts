import { Router } from "express";
import AuthMiddleware from "../accountManagement/middleware/auth.middleware";
import AddressController from './address.controller'

const addressRoutes = Router()
const addressController = new AddressController()
const authMiddleware = new AuthMiddleware()

addressRoutes.post('/create_address', authMiddleware.authUserMiddleware, addressController.createNewAddress)
addressRoutes.get('/address_list', authMiddleware.authUserMiddleware, addressController.getUserAddressList)
addressRoutes.patch('/update_address/:_id', authMiddleware.authUserMiddleware, addressController.updateAddress)
addressRoutes.delete('/delete_address', authMiddleware.authUserMiddleware, addressController.deleteAddress)

export default addressRoutes