import { Request, Response } from "express";

export const headerCache = (maxAge: number, req: Request, res: Response) => {
  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=${maxAge}`)
  }
}