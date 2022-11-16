import { NextFunction, Request, Response } from "express";
import handleException from "../../../utils/handleExceptions";
import jwt from 'jsonwebtoken'
import JwtFlow from "../controllers/jwt.controller";

class JwtMiddleware {
  private jwtFlow: JwtFlow
  constructor() {
    this.jwtFlow = new JwtFlow()
  }

  refreshAccessTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    try {
      let refresh_token = req.cookies.refreshtoken
      if (!refresh_token) {
        this.jwtFlow.createRefreshToken({id: req.body.id}, res)
        refresh_token = req.cookies.refreshtoken
      } 
      req.body.refresh_token = refresh_token
      next()
    } catch(e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default JwtMiddleware