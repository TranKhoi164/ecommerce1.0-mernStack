import { NextFunction, Request, Response } from "express"


interface AuthMiddlewareInterface {
  registerMiddleware(res: Request,  req: Response, next: NextFunction): Promise<void>
  activeAccountMiddleware(res: Request,  req: Response, next: NextFunction): Promise<void>
  loginMiddleware(res: Request,  req: Response, next: NextFunction): void
  authUserMiddleware(res: Request,  req: Response, next: NextFunction): void
}

export default AuthMiddlewareInterface