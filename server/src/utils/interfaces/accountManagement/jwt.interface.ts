import { Request, Response } from "express"

interface JwtInterface {
  createActiveToken(payload: any): string
  createAccessToken(payload: any): string
  createRefreshToken(payload: any, res: Response): void
  refreshAccessToken(req: Request, res: Response): void
}

export default JwtInterface