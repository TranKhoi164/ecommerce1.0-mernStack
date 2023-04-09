"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = __importDefault(require("../accountManagement/middleware/auth.middleware"));
const rating_ctrl_1 = __importDefault(require("./rating.ctrl"));
const rating_middleware_1 = require("./rating.middleware");
const ratingRoutes = (0, express_1.Router)();
const ratingCtrl = new rating_ctrl_1.default();
const authMiddleware = new auth_middleware_1.default();
ratingRoutes.get('/get_ratings_of_product/:product', rating_middleware_1.RatingHttpCache, ratingCtrl.getRatingsOfProduct);
ratingRoutes.get('/get_ratings_by_page', ratingCtrl.getRatingsByPage);
ratingRoutes.patch('/update_rating', authMiddleware.authUserMiddleware, ratingCtrl.updateRating);
ratingRoutes.post('/create_rating', authMiddleware.authUserMiddleware, ratingCtrl.createRating);
ratingRoutes.get('/:product', authMiddleware.authUserMiddleware, ratingCtrl.getRating);
exports.default = ratingRoutes;
