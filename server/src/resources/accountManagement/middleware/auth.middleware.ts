import { NextFunction, Request, Response } from "express";
import handleException from "../../utils/handleExceptions";
import Accounts from "../../resources/accountManagement/models/account.model";
import jwt from 'jsonwebtoken'

async function checkIfAccountExistByEmail(email: string, res: Response) {
  const checkAccount = await Accounts.findOne({email: email})
  if (checkAccount !== null) {
    return handleException(400, 'Tài khoản đã được tạo từ trước', res)
  }
}

class AccountMiddleware {
  registerMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.body
      checkIfAccountExistByEmail(email, res)
      next()
    } catch(e: any) {
      handleException(500, e.message, res)
    }
  }
  activeAccountMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      const {active_token} = req.body 
      jwt.verify(active_token, String(process.env.JWT_ACTIVE_TOKEN), async (err: any, accountData: any) => {
        if (err) handleException(400, err, res)
        checkIfAccountExistByEmail(accountData.email, res)
        req.body = accountData
        next()
      })
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default AccountMiddleware