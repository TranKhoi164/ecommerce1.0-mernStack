import { Request, Response } from "express";
import JwtInterface from "../../../utils/interfaces/accountManagement/jwt.interface";
import jwt from 'jsonwebtoken'
import handleException from "../../../utils/handleExceptions";

class JwtFlow implements JwtInterface {
  public createAccessToken(payload: any): string {
    return jwt.sign(payload, String(process.env.JWT_ACCESS_TOKEN), {expiresIn: '15m'})
  }
  public createActiveToken(payload: any): string {
    return jwt.sign(payload, String(process.env.JWT_ACTIVE_TOKEN), {expiresIn: '5m'})
  }
  public createRefreshToken(payload: any, res: Response): string {
    const refresh_token = jwt.sign(payload, String(process.env.JWT_REFRESH_TOKEN), {expiresIn: '7d'})

    res.cookie('refreshtoken', refresh_token, {
      httpOnly: true,
      path: '/account/refresh_token',
      sameSite: 'strict',
      maxAge: 7*24*59*60*1000
      //7*24*60*60*1000 //1 wee
    })
    return refresh_token
  }
  public refreshAccessToken = (req: Request, res: Response): void => {
    try {
      let refresh_token = req.body.refresh_token
      jwt.verify(refresh_token, String(process.env.JWT_REFRESH_TOKEN), async (e: any, accountData: any) => {
        if (e) {
          handleException(400, e.message, res)
          return
        }
        const access_token = this.createAccessToken({_id: accountData._id})
        
        res.json({access_token: access_token})
      })
    } catch(e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default JwtFlow
