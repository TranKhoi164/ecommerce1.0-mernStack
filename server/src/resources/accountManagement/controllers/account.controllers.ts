import { Request ,Response } from "express";
import AccountManipulateInterface from "../../../utils/interfaces/accountManagement/account.interface";


class AccountController implements AccountManipulateInterface {
  public getAccountInformation(req: Request, res: Response): Response {
      return res.json({msg: 'hello world'})
  }
  public updateAccount(req: Request, res: Response): Response {
    return res.json({msg: 'hello world'})
  }
  public userForgotPassword(req: Request, res: Response): Response {
    return res.json({msg: 'hello world'})
  }
  public userResetPassword(req: Request, res: Response): Response {
    return res.json({msg: 'hello world'})
  }
}

export default AccountController