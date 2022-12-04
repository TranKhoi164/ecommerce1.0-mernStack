import { NextFunction, Request, Response } from "express";
import handleException from "../../../utils/handleExceptions";
import { validatePassword, validateUsername } from "../../../utils/validate/validateAccount";
import Accounts from "../models/account.model";
import bcrypt from 'bcrypt'

class AccountMiddleware {
  public updateBasicMiddleware(req: Request, res: Response, next: NextFunction) {
    try { 
      if (!validateUsername(req.body.username)) {
        handleException(400, 'Tên đăng nhập không hợp lệ', res)
        return
      }
      next()
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async updatePasswordMiddleware(req: Request, res: Response, next: NextFunction) {
    try { 
      if (!validatePassword(req.body.newPassword)) {
        handleException(400, 'Mật khẩu không hợp lệ', res)
        return
      }
      const account = await Accounts.findOne({ _id: req.body._id })
      const checkPassword = await bcrypt.compare(req.body.password, String(account?.password))
      if (!checkPassword) {
        handleException(400, 'Mật khẩu cung cấp không đúng', res)
        return
      }
      next()
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default AccountMiddleware