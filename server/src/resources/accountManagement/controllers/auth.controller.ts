import { Request, Response } from "express";
import AuthInterface from "../../../utils/interfaces/accountManagement/controller/auth.ctrl.interface";
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
      .then(() => {
        res.json({message: 'Kiểm tra email để kích hoạt tài khoản'})
      })
      .catch((e:any) => {
        handleException(500, e.message, res)
        return
      })

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

  public async sendResetPasswordEmail(req: Request, res: Response): Promise<void> {
    try {
      const {email} = req.body
      const user = await Accounts.findOne({email})
      if (!user) {
        res.status(400).json({msg: "Người dùng chưa đăng nhập"})
        return
      }
      
        //payload: user email
      const active_token = jwtFlow.createAccessToken({email: user?.email})
      const resetPassClientUrl = `${process.env.CLIENT_URL}/reset_password/${active_token}`
      sendEmail(email, resetPassClientUrl, "Nhấn vào link bên dưới để tạo mật khẩu mới")
      res.json({message: "Kiểm tra email để tạo mật khẩu mới"})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }

  public async resetPasswordWithAccessToken(req: Request, res: Response): Promise<void> {
    try {
      let {active_token, password} = req.body
      console.log('jwtactivetoken: ', process.env.JWT_ACCESS_TOKEN);
      password = await bcrypt.hash(password, 8)
      jwt.verify(active_token, String(process.env.JWT_ACCESS_TOKEN), async (err:any,userData:any) => {
        if (err) 
          return handleException(400, err.message + ' xin vui lòng thử lại', res)

        await Accounts.findOneAndUpdate({email: userData.email}, {password: password})
        return res.json({message: "Mật khậu đã được tạo, giờ bạn có thể đăng nhập"})
      })
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  
  public userLogout(req: Request, res: Response): void {
    try {
      res.clearCookie('refreshtoken', {path: '/account/refresh_token'})
      res.json({message: 'Đăng xuất thành công'})
    } catch (e: any) {  
      handleException(500, e.message, res)
    }
  }
}

export default AuthController