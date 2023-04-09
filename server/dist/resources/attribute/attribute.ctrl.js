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
const attribute_model_1 = __importDefault(require("./attribute.model"));
const redis_service_1 = require("../../service/redis/redis.service");
class AttributeCtrl {
    createAttribute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name } = req.body.attribute;
                const newAttribute = new attribute_model_1.default(Object.assign(Object.assign({}, req.body.attribute), { slug: (0, slugify_1.slugify)(name) }));
                newAttribute.save();
                res.json({ message: 'Tạo thuộc tính thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getAttributeList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // await saveDataToCache('pageList', JSON.stringify(pageList), 60*60*24)
                //   const schedule = cron.schedule('*/1 * * *', async () => {
                //     const savePageList = await Pages.find({}).populate({
                //       path: 'subPages',
                //       populate: {
                //         path: 'categories',
                //         model: 'category',
                //         populate: {
                //           path: 'subCategories',
                //           model: 'subCategory',
                //         }
                //       }
                //     })
                //     await saveDataToCache('pageList', JSON.stringify(savePageList), 60*60*24)
                //   })
                //   schedule.start()
                //   setTimeout(()=>{
                //     schedule.stop()
                //   }, 1000*60*60*24)
                let cachedAttributes = yield (0, redis_service_1.getDataFromCache)('attributes');
                if (cachedAttributes) {
                    res.json({ attribute_list: JSON.parse(cachedAttributes) });
                    return;
                }
                else {
                    const attributeList = yield attribute_model_1.default.find({});
                    yield (0, redis_service_1.saveDataToCache)('attributes', JSON.stringify(attributeList), 60 * 60);
                    res.json({ attribute_list: attributeList });
                }
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    addAttributeValue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield attribute_model_1.default.findByIdAndUpdate(req.body.attribute._id, { $push: { values: req.body.attribute.value } });
                res.json({ message: 'Tạo giá trị thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    deleteAttributeValue(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { value } = req.body.attribute;
                console.log(req.body.attribute);
                yield attribute_model_1.default.updateOne({ _id: req.body.attribute._id }, { $pullAll: {
                        values: [value],
                    } });
                res.json({ message: 'Xóa thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    deleteAttribute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield attribute_model_1.default.findByIdAndDelete(req.body.attribute._id);
                res.json({ message: 'Xóa thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
}
exports.default = AttributeCtrl;
