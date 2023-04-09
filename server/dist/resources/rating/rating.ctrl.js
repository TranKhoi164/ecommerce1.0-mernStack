"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const redis_service_1 = require("../../service/redis/redis.service");
const handleExceptions_1 = __importDefault(require("../../utils/handleExceptions"));
const order_model_1 = __importDefault(require("../order/order.model"));
const product_model_1 = __importDefault(require("../product/product.model"));
const rating_model_1 = __importDefault(require("./rating.model"));
const node_cron_1 = __importDefault(require("node-cron"));
class RatingCtrl {
    createRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRating = new rating_model_1.default(req.body.rating);
                yield newRating.save();
                yield order_model_1.default.findByIdAndUpdate(req.body.rating.order, { isRated: 1 });
                yield product_model_1.default.findByIdAndUpdate(req.body.rating.product, {
                    $addToSet: { rating: newRating._id }
                });
                res.json({ message: 'Đánh giá sản phẩm thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { product } = req.params;
                const rating = yield rating_model_1.default.findOne({ product: product, account: req.body._id });
                res.json({ rating: rating });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getRatingsOfProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { product } = req.params;
                let cacheRatings = yield (0, redis_service_1.getDataFromCache)('ratings:' + product);
                cacheRatings = JSON.parse(cacheRatings);
                if ((cacheRatings === null || cacheRatings === void 0 ? void 0 : cacheRatings.length) > 0) {
                    console.log(1);
                    res.json({ ratings: cacheRatings });
                    return;
                }
                else {
                    const ratings = yield rating_model_1.default.find({ product: product })
                        .populate('inventory', 'attribute')
                        .populate('account', 'username')
                        .sort({ createdAt: -1 });
                    if ((ratings === null || ratings === void 0 ? void 0 : ratings.length) > 0) {
                        console.log('2');
                        yield (0, redis_service_1.saveDataToCache)(`ratings:${product}`, JSON.stringify(ratings), 60 * 60);
                        let schedule = node_cron_1.default.schedule('*/12 * * * *', () => __awaiter(this, void 0, void 0, function* () {
                            console.log('ngu');
                            const sheduleRatings = yield rating_model_1.default.find({ product: product })
                                .populate('inventory', 'attribute')
                                .populate('account', 'username')
                                .sort({ createdAt: -1 });
                            yield (0, redis_service_1.saveDataToCache)(`ratings:${product}`, JSON.stringify(sheduleRatings));
                        }));
                        schedule.start();
                        setTimeout(() => {
                            schedule.stop();
                        }, 1000 * 60 * 60);
                        res.json({ ratings: ratings });
                    }
                }
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getRatingsByPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.query);
                const perPage = 3;
                const { page } = req.query;
                const queryObj = Object.assign({}, req.query);
                delete queryObj['page'];
                const ratings = yield rating_model_1.default.find(queryObj)
                    .limit(page * perPage)
                    .skip((page - 1) * perPage)
                    .populate('inventory', 'attribute')
                    .populate('account', 'username');
                res.json({ ratings: ratings });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    updateRating(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { rating } = req.body;
                yield rating_model_1.default.findByIdAndUpdate(rating === null || rating === void 0 ? void 0 : rating._id, Object.assign({}, rating));
                res.json({ message: 'Cập nhập thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
}
exports.default = RatingCtrl;
