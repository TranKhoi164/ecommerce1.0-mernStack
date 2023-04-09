import { Request, Response, NextFunction } from "express";
import { getDataFromCache, saveDataToCache } from "../../service/redis/redis.service";

const maxAge = 60*60

export function getPagesMiddleware(req: Request, res: Response, next: NextFunction) {
  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=${maxAge}`)
  }
  next()
}

