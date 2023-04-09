import { Router } from "express";
import AuthMiddleware from "../accountManagement/middleware/auth.middleware";
import RatingCtrl from "./rating.ctrl";
import { RatingHttpCache } from "./rating.middleware";

const ratingRoutes = Router()
const ratingCtrl = new RatingCtrl()
const authMiddleware = new AuthMiddleware()

ratingRoutes.get('/get_ratings_of_product/:product', RatingHttpCache, ratingCtrl.getRatingsOfProduct)
ratingRoutes.get('/get_ratings_by_page', ratingCtrl.getRatingsByPage)
ratingRoutes.patch('/update_rating', authMiddleware.authUserMiddleware, ratingCtrl.updateRating)
ratingRoutes.post('/create_rating', authMiddleware.authUserMiddleware, ratingCtrl.createRating)
ratingRoutes.get('/:product', authMiddleware.authUserMiddleware, ratingCtrl.getRating)

export default ratingRoutes