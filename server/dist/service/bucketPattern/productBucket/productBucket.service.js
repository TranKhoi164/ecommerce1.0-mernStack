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
const productBucket_model_1 = __importDefault(require("./productBucket.model"));
class ProductBucketService {
    insertProduct(subPageId, productId, pageSise = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productBucket_model_1.default.findOneAndUpdate({
                    subPage: subPageId,
                    count: { $lt: pageSise }
                }, {
                    $push: { products: productId },
                    $inc: { count: 1 },
                }, {
                    new: true,
                    upsert: true
                });
            }
            catch (e) {
                throw new Error(e);
            }
        });
    }
    productPaging(subPageId, page, pageSize) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield productBucket_model_1.default.find({ subPage: subPageId }).skip((page - 1) * pageSize).limit(pageSize);
            }
            catch (e) {
                throw new Error('Product paging error');
            }
        });
    }
}
exports.default = ProductBucketService;
