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
const handleExceptions_1 = __importDefault(require("../../utils/handleExceptions"));
const slugify_1 = require("../../utils/stringFunc/slugify");
const page_model_1 = __importDefault(require("./page.model"));
const subPage_model_1 = __importDefault(require("../subPage/subPage.model"));
const redis_service_1 = require("../../service/redis/redis.service");
const node_cron_1 = __importDefault(require("node-cron"));
class PageController {
    createPage(req, res) {
        try {
            const newPage = new page_model_1.default(Object.assign(Object.assign({}, req.body.page), { slug: (0, slugify_1.slugify)(req.body.page.name) }));
            newPage.save();
            res.json({ message: 'Tạo trang mới thành công' });
        }
        catch (e) {
            (0, handleExceptions_1.default)(500, e.message, res);
        }
    }
    getPageList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const cachedPageList = yield (0, redis_service_1.getDataFromCache)('pageList');
                if (cachedPageList) {
                    console.log(1);
                    res.json({ page_list: JSON.parse(cachedPageList) });
                }
                else {
                    console.log(2);
                    const pageList = yield page_model_1.default.find({}).populate({
                        path: 'subPages',
                        populate: {
                            path: 'categories',
                            model: 'category',
                            populate: {
                                path: 'subCategories',
                                model: 'subCategory',
                            }
                        }
                    });
                    yield (0, redis_service_1.saveDataToCache)('pageList', JSON.stringify(pageList), 60 * 60 * 24);
                    const schedule = node_cron_1.default.schedule('*/1 * * *', () => __awaiter(this, void 0, void 0, function* () {
                        console.log('ngu');
                        const savePageList = yield page_model_1.default.find({}).populate({
                            path: 'subPages',
                            populate: {
                                path: 'categories',
                                model: 'category',
                                populate: {
                                    path: 'subCategories',
                                    model: 'subCategory',
                                }
                            }
                        });
                        yield (0, redis_service_1.saveDataToCache)('pageList', JSON.stringify(savePageList));
                    }));
                    schedule.start();
                    setTimeout(() => {
                        schedule.stop();
                    }, 1000 * 60 * 60 * 24);
                    res.json({ page_list: pageList });
                }
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    deletePage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield page_model_1.default.findOneAndDelete({ _id: req.body.page._id });
                yield subPage_model_1.default.deleteMany({ page: req.body.page._id });
                res.json({ message: 'Xóa trang thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
}
exports.default = PageController;
