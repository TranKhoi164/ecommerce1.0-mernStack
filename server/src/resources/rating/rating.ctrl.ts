import { Request, Response } from "express";
import { getDataFromCache, saveDataToCache } from "../../service/redis/redis.service";
import handleException from "../../utils/handleExceptions";
import RatingInterface from "../../utils/interfaces/rating/rating.ctrl.interface";
import Orders from "../order/order.model";
import Products from "../product/product.model";
import Ratings from "./rating.model";
import cron from 'node-cron'

class RatingCtrl implements RatingInterface {
  public async createRating(req: Request, res: Response): Promise<void> {
    try { 
      const newRating = new Ratings(req.body.rating)
      await newRating.save()  
      await Orders.findByIdAndUpdate(req.body.rating.order, { isRated: 1 })
      await Products.findByIdAndUpdate(req.body.rating.product, {
        $addToSet: { rating: newRating._id}
      })
      res.json({message: 'Đánh giá sản phẩm thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async getRating(req: Request, res: Response): Promise<void> {
    try {
      const {product} = req.params
      const rating = await Ratings.findOne({product: product, account: req.body._id})
      res.json({rating: rating})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async getRatingsOfProduct(req: Request, res: Response): Promise<void> {
    try {
      const {product} = req.params
      let cacheRatings: any = await getDataFromCache('ratings:'+product)
      cacheRatings = JSON.parse(cacheRatings)

      if (cacheRatings?.length > 0) {
        console.log(1);
        res.json({ratings: cacheRatings})
        return
      } else {
        const ratings = await Ratings.find({product: product})
                      .populate('inventory', 'attribute')
                      .populate('account', 'username')
                      .sort({createdAt: -1})
        if (ratings?.length > 0) {
          console.log('2');
          await saveDataToCache(`ratings:${product}`, JSON.stringify(ratings), 60*60)
          
          let schedule = cron.schedule('*/12 * * * *', async () => {
            console.log('ngu');
            const sheduleRatings = await Ratings.find({product: product})
                      .populate('inventory', 'attribute')
                      .populate('account', 'username')
                      .sort({createdAt: -1})
            await saveDataToCache(`ratings:${product}`, JSON.stringify(sheduleRatings))
          })
          schedule.start()
          setTimeout(()=>{
            schedule.stop()
          }, 1000*60*60)

          res.json({ratings: ratings})
        }
      }
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async getRatingsByPage(req: Request<{}, {}, {}, {page: any, product: any}>, res: Response): Promise<void> {
    try {
      console.log(req.query);
      const perPage = 3
      const { page } = req.query
      const queryObj = {...req.query}
      delete queryObj['page']

      const ratings = await Ratings.find(queryObj)
                            .limit(page * perPage)
                            .skip((page-1) * perPage)
                            .populate('inventory', 'attribute')
                            .populate('account', 'username')
      res.json({ratings: ratings})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
  public async updateRating(req: Request, res:Response): Promise<void> {
    try {
        const {rating} = req.body
        await Ratings.findByIdAndUpdate(rating?._id, { ...rating })
        res.json({message: 'Cập nhập thành công'})
    } catch (e: any) {
      handleException(500, e.message, res)
    }
  }
}

export default RatingCtrl