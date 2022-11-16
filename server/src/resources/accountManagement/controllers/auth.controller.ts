import { Request, Response } from "express";
import AuthInterface from "../../../utils/interfaces/accountManagement/auth.interface";
import handleException from "../../../utils/handleExceptions";
import JwtFlow from "./jwt.controller";
import sendEmail from "../../../utils/sendEmail";
import jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'
import Accounts from "../models/account.model";

class AuthController implements AuthInterface {
  private jwtFlow: JwtFlow

  constructor() {
    this.jwtFlow = new JwtFlow()
  }

  userRegister(req: Request, res: Response): void {
    try {
      const { email, password } = req.body
      const activeToken = this.jwtFlow.createActiveToken({email, password})
      //client url to active account
      const clientActiveUrl = `${process.env.CLIENT_URL}/active/${activeToken}`
      sendEmail(email, clientActiveUrl, 'Nhấn vào link bên dưới để kích hoạt tài khoản')
    
      res.json({msg: 'Kiểm tra email của bạn để kích hoạt tài khoản'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  async activeAccountWithEmail(req: Request, res: Response): Promise<void> {
    try {
      const {password} = req.body
      const passwordHash = await bcrypt.hash(password, 8)
      const newAccountObj = {
        ...req.body,
        password: passwordHash
      }
      const newAccount = new Accounts(newAccountObj)
      await newAccount.save()

      this.jwtFlow.createRefreshToken({id: newAccount._id}, res)
      const access_token = this.jwtFlow.createAccessToken({id: newAccount._id})
      
      const resAccountData = {
        ...newAccount,
        access_token: access_token
      }
      res.json({account_data: resAccountData})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  userLogin(req: Request, res: Response): Response {
    return res.json({msg: 'Hi'})
  }
  
  userLogout(req: Request, res: Response): void {
    res.json({msg: 'Hi'})
  }
}

export default AuthController