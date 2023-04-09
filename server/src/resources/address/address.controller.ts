import { json } from "body-parser";
import { Request, Response } from "express";
import handleException from "../../utils/handleExceptions";
import addressInterface from "../../utils/interfaces/address/address.ctrl.interface";
import Addresses from "./address.model";
import mongoose from "mongoose";
import Accounts from "../accountManagement/models/account.model";

const { ObjectId } = mongoose.Types

class AddressController implements addressInterface {
  public async createNewAddress(req: Request, res: Response): Promise<void> {
    try {
      const newAddress = req.body.address
      const newAddresssSave = new Addresses({account: new ObjectId(req.body._id), ...newAddress})
      await newAddresssSave.save()
      await Accounts.findByIdAndUpdate(req.body._id, {$push: {addresses: newAddresssSave?._id}})
      res.json({message: 'Thêm mới địa chỉ thành công'})
    } catch(e: any) {
      handleException(500, e.message, res)
    }
  }
  public async getUserAddressList(req: Request, res: Response): Promise<void> {
    try {
      const addressList = await Addresses.find({account: req.body._id})
      res.json({address_list: addressList})
    } catch(e: any) {
      handleException(500, e.message, res)
    }
  }

  public async updateAddress(req: Request, res: Response): Promise<void> {
    try {
      await Addresses.findByIdAndUpdate(new ObjectId(req.params._id), { ...req.body.address })
      res.json({message: 'Cập nhập thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async deleteAddress(req: Request, res: Response): Promise<void> {
    try {
      await Addresses.findByIdAndDelete(req.body.address._id)
      res.json({message: 'Xóa thành công'})
    } catch(e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default AddressController