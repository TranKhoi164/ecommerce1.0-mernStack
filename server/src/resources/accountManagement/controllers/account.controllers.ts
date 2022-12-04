import { Request ,Response } from "express";
import handleException from "../../../utils/handleExceptions";
import AccountManipulateInterface from "../../../utils/interfaces/accountManagement/account.interface";
import Accounts from "../models/account.model";
import bcrypt from 'bcrypt'

class AccountController implements AccountManipulateInterface {
  public async getAccountInformation(req: Request, res: Response): Promise<void> {
    try { 
      await Accounts.findOne({_id: req.body._id}, async (e: any, account: any) => {
        if (e) {
          handleException(400, e.message, res)
          return
        }
        res.json({account})
      }).select('-password').clone().catch((e) => handleException(400, e.message, res))
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async updateAccountBasicInfor(req: Request, res: Response): Promise<void> {
    try { 
      const accountUpdate = req.body
      await Accounts.findOneAndUpdate({_id: req.body._id}, {...accountUpdate})
      res.json({message: 'Cập nhập thông tin thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async updateAccountPassword(req: Request, res: Response): Promise<void> {
    try {
      const {newPassword} = req.body
      const passwordHash = await bcrypt.hash(newPassword, 8)
      await Accounts.findOneAndUpdate({_id: req.body._id}, {password: passwordHash})
      res.json({message: 'Cập nhập mật khẩu thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async userForgotPassword(req: Request, res: Response): Promise<void> {
    
  }
  public async userResetPassword(req: Request, res: Response): Promise<void> {
    
  }
}

export default AccountController