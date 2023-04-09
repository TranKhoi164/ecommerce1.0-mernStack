import { NextFunction, Request, Response } from "express";
import handleException from "../../../utils/handleExceptions";
import Accounts from "../models/account.model";
import jwt from 'jsonwebtoken'
import { validateEmail, validatePassword } from "../../../utils/stringFunc/validateAccount";
import AuthMiddlewareInterface from "../../../utils/interfaces/accountManagement/middleware/auth.mdw.intercface";

async function checkIfAccountExistByEmail(email: string) {
  const checkAccount = await Accounts.findOne({email: email})
  if (checkAccount) {
    return true
  } else return false
}

class AuthMiddleware implements AuthMiddlewareInterface {
  public async registerMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { email, password } = req.body
      if (await checkIfAccountExistByEmail(email)) {
        handleException(400, 'Tài khoản đã được tạo từ trước', res)
        return
      }
      if (validateEmail(email) == null || validatePassword(password) == null) {
        handleException(400, 'Thông tin cung cấp không hợp lệ', res)
        return 
      }
      next()
    } catch(e: any) {
      handleException(500, e.message, res)
    }
  }

  public async activeAccountMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const active_token = req.headers.authorization 
      if (!active_token) {
        handleException(400, 'Bạn chưa đăng ký', res)
      }
      jwt.verify(String(active_token), String(process.env.JWT_ACTIVE_TOKEN), async (err: any, accountData: any) => {
        if (err) {
          handleException(400, err.message, res)
          return
        }
        if (await checkIfAccountExistByEmail(accountData.email)) {
          handleException(400, 'Tài khoản đã được tạo từ trước', res)
          return
        }
        req.body = accountData
        console.log(accountData);
        next()
      })
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public loginMiddleware(req: Request, res: Response, next: NextFunction): void {
    const {email, password} = req.body

    if (validateEmail(email) == null || validatePassword(password) == null) {
      handleException(400, 'Thông tin cung cấp không hợp lệ', res)
      return 
    }
    next()
  }

  public authUserMiddleware(req: Request, res: Response, next: NextFunction): void {
    try {
      const access_token = req.headers.authorization
      if (!access_token) {
        handleException(400, 'Chưa được cấp quyền để thực hiện hành động này', res)
        return
      }
      jwt.verify(access_token, String(process.env.JWT_ACCESS_TOKEN), async (e: any, userData: any) => {
        if (e) {
          handleException(400, e.message, res)
          return
        }
        req.body._id = userData._id
        next()
      })
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async authAdminMiddleware(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const accountId = req.body._id
      const checkUser = await Accounts.findOne({_id: accountId})
      if (checkUser?.role === 0) {
        handleException(400, 'Chưa được cấp quyền để thực hiện hành động này', res)
        return
      }
      next()
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default AuthMiddleware