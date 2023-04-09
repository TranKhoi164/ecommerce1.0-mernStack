import { NextFunction, Request, Response } from "express"


interface AccountMiddlewareInterface {
  updateBasicMiddleware(res: Request,  req: Response, next: NextFunction): void
  updatePasswordMiddleware(res: Request,  req: Response, next: NextFunction): Promise<void>

}

export default AccountMiddlewareInterface