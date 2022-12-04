import { NextFunction, Request, Response } from "express";
import handleException from "../../../utils/handleExceptions";
import jwt from 'jsonwebtoken'
import JwtFlow from "../controllers/jwt.controller";

const jwtFlow = new JwtFlow()
class JwtMiddleware {

  refreshAccessTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      let refresh_token = req.cookies.refreshtoken
      if (!refresh_token) {
        refresh_token = jwtFlow.createRefreshToken({_id: req.body._id}, res)
      } 
      req.body.refresh_token = refresh_token
      next()
    } catch(e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default JwtMiddleware