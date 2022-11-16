import { Request, Response } from "express";
import JwtInterface from "../../../utils/interfaces/accountManagement/jwt.interface";
import jwt from 'jsonwebtoken'
import handleException from "../../../utils/handleExceptions";

class JwtFlow implements JwtInterface {
  createAccessToken(payload: any): string {
    return jwt.sign(payload, String(process.env.JWT_ACCESS_TOKEN), {expiresIn: '15m'})
  }
  createActiveToken(payload: any): string {
    return jwt.sign(payload, String(process.env.JWT_ACTIVE_TOKEN), {expiresIn: '5m'})
  }
  createRefreshToken(payload: any, res: Response): void {
    const refresh_token = jwt.sign(payload, String(process.env.JWT_REFRESH_TOKEN), {expiresIn: '7d'})

    res.cookie('refreshtoken', refresh_token, {
      httpOnly: true,
      path: '/account/refresh_token',
      sameSite: 'strict',
      maxAge: 7*24*60*60*1000 //1 wneej
    })
  }
  refreshAccessToken(req: Request, res: Response): void {
    try {
      jwt.verify(req.body.refresh_token, String(process.env.JWT_REFRESH_TOKEN), async (err: any, accountData: any) => {
        if (err) handleException(400, err, res)
        const access_token = this.createAccessToken({id: accountData._id})
        
        res.json({access_token: access_token})
      })
    } catch(e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default JwtFlow
