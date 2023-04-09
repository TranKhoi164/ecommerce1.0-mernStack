import { Request, Response, NextFunction } from "express";
import { getDataFromCache, saveDataToCache } from "../../service/redis/redis.service";
import handleException from "../../utils/handleExceptions";
import RatingInterface from "../../utils/interfaces/rating/rating.ctrl.interface";
import Orders from "../order/order.model";
import Products from "../product/product.model";
import Ratings from "./rating.model";

const maxAge = 60*15

export function RatingHttpCache(req: Request, res: Response, next: NextFunction) {
  if (req.method == 'GET') {
    res.set('Cache-control', `public, max-age=${maxAge}`)
  }
  next()
}

