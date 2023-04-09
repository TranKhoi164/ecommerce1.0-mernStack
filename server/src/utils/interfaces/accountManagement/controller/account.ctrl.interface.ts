import { Request, Response } from "express";

interface AccountManipulateInterface {
  getAccountInformation(req: Request, res: Response): Promise<void>
  updateAccountBasicInfor(req: Request, res: Response): Promise<void>
  updateAccountPassword(req: Request, res: Response): Promise<void>
  userForgotPassword(req: Request, res: Response): Promise<void>
  userResetPassword(req: Request, res: Response): Promise<void>
}

export default AccountManipulateInterface