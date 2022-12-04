import { Request, Response } from "express";
import AuthInterface from "../../../utils/interfaces/accountManagement/auth.interface";
import handleException from "../../../utils/handleExceptions";
import JwtFlow from "./jwt.controller";
import sendEmail from "../../../utils/sendEmail";
import jwt  from "jsonwebtoken";
import bcrypt from 'bcrypt'
import Accounts from "../models/account.model";

const jwtFlow = new JwtFlow()

class AuthController  {

  public userRegister(req: Request, res: Response): void {
    try {
      const { email, password } = req.body
      const activeToken = jwtFlow.createActiveToken({email, password})
      //client url to active account
      const clientActiveUrl = `${process.env.CLIENT_URL}/active/${activeToken}`
      sendEmail(email, clientActiveUrl, 'Nhấn vào link bên dưới để kích hoạt tài khoản')
    
      res.json({message: 'Kiểm tra email của bạn để kích hoạt tài khoản'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async activeAccountWithEmail(req: Request, res: Response): Promise<void> {
    try {
      const {password} = req.body
      const passwordHash = await bcrypt.hash(password, 8)
      const newAccountObj = {
        ...req.body,
        password: passwordHash
      }
      const newAccount = new Accounts(newAccountObj)

      newAccount.save()
      res.json({message: 'Kích hoạt tài khoản thành công, giờ bạn có thể đăng nhập'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async userLogin(req: Request, res: Response): Promise<void> {
    try {
      const {email, password} = req.body
      Accounts.findOne({email}, async (err: any, user: any) => {
        if (!user) {
          handleException(400, "Tài khoản chưa được đăng ký", res)
          return
        }
        const passwordMatch = await bcrypt.compare(password, String(user.password))
        if (!passwordMatch) {
          handleException(400, "Mật khẩu không chính xác", res)
          return
        }
        const access_token = jwtFlow.createAccessToken({_id: user._id})
        jwtFlow.createRefreshToken({_id: user._id}, res)

        res.json({account: {...user._doc, access_token}})
      })
    } catch(e: any) {
      handleException(500, e.message, res)
    }
  }
  
  public userLogout(req: Request, res: Response): void {
     res.json({msg: 'Hi'})
  }
}

export default AuthController