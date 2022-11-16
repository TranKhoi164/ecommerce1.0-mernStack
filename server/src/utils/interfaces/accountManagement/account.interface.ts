import { Request, Response } from "express";

interface AccountManipulateInterface {
  getAccountInformation(req: Request, res: Response): Response
  updateAccount(req: Request, res: Response): Response
  userForgotPassword(req: Request, res: Response): Response
  userResetPassword(req: Request, res: Response): Response
}

export default AccountManipulateInterface