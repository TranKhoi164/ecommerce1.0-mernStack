import { Router } from "express";
import addressController from './address.controller'

const addressRoutes = Router()
const addressCtrl = new addressController()

addressRoutes.post('/new_address', addressCtrl.createNewAddress)
addressRoutes.get('/address_detail', addressCtrl.getAddressDetail)

export default addressRoutes