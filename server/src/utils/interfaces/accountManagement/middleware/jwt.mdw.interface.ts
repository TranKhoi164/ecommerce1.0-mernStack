import { NextFunction, Request, Response } from "express"


interface JwtMiddlewareInterface {
  //check if refresh_token exist at cookies, if no => create new One => next
  refreshAccessTokenMiddleware(res: Request,  req: Response, next: NextFunction): void
}

export default JwtMiddlewareInterface