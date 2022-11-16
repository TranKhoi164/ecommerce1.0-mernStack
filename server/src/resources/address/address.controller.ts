import { json } from "body-parser";
import { Request, Response } from "express";
import addressInterface from "../../utils/interfaces/address.interface";

class addressController implements addressInterface {
  createNewAddress(req: Request, res: Response): Response {
    return res.json({addressId: 'new address id'})
  }
  getAddressDetail(req: Request, res: Response): Response {
    return res.json({address: 'This is address'})
  }
}

export default addressController