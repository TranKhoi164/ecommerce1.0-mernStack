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
const product_model_1 = __importDefault(require("./product.model"));
const inventory_model_1 = __importDefault(require("../inventory/inventory.model"));
const product_feature_1 = __importDefault(require("./product.feature"));
const redis_service_1 = require("../../service/redis/redis.service");
class ProductCtrl {
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, price, quantity, sku } = req.body.product;
                const newProduct = new product_model_1.default(Object.assign(Object.assign({}, req.body.product), { slug: (0, slugify_1.slugify)(name) }));
                yield newProduct.save();
                const inven = new inventory_model_1.default({ product: newProduct === null || newProduct === void 0 ? void 0 : newProduct._id, sku: sku, price: price, quantity: quantity });
                yield product_model_1.default.findByIdAndUpdate(newProduct._id, { $push: { inventories: inven._id } });
                yield inven.save();
                res.json({ message: 'Tạo sản phẩm thành công', product_id: newProduct._id });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { product_sku } = req.params;
                // const product = await Products.findOne({sku: product_sku})
                // .populate('inventories')
                const cacheProduct = yield (0, redis_service_1.getDataFromCache)('product:' + product_sku);
                if (cacheProduct) {
                    res.json({ product: JSON.parse(cacheProduct) });
                    return;
                }
                else {
                    const product = yield product_model_1.default.findOne({ sku: product_sku })
                        .populate('inventories');
                    yield (0, redis_service_1.saveDataToCache)(`product:${product === null || product === void 0 ? void 0 : product.sku}`, JSON.stringify(product), 60 * 60);
                    res.json({ product: product });
                    return;
                }
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.mesage, res);
            }
        });
    }
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const productService = new product_feature_1.default(req.query);
                yield productService.filter();
                const products = yield productService.query;
                res.json({ products: products });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getProductsDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { products } = req.body;
                console.log(req.body);
                let productsKey = [];
                for (let id of products) {
                    productsKey.push('products:product:' + id);
                }
                const entries = yield (0, redis_service_1.getMultipleEntries)(productsKey);
                let productsDetail = [];
                for (let i = 0; i < entries.length; i++) {
                    if (!entries[i]) {
                        const findProduct = yield product_model_1.default.findById(products[i])
                            .select('name sku images price minPrice maxPrice');
                        productsDetail[i] = Object.assign({}, findProduct === null || findProduct === void 0 ? void 0 : findProduct._doc);
                        yield (0, redis_service_1.saveDataToCache)(`products:product:${products[i]}`, JSON.stringify(findProduct), 60 * 60 * 24);
                    }
                    else {
                        productsDetail[i] = JSON.parse(entries[i]);
                    }
                }
                res.json({ products: productsDetail });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    deleteProduct(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield product_model_1.default.findByIdAndDelete(req.body.product._id, (err, data) => __awaiter(this, void 0, void 0, function* () {
                    yield (0, redis_service_1.deleteDataFromCache)('product:' + data.sku);
                    yield (0, redis_service_1.deleteDataFromCache)('products:product:' + req.body.product._id);
                }));
                yield inventory_model_1.default.deleteMany({ product: (_a = req.body.product) === null || _a === void 0 ? void 0 : _a._id });
                res.json({ message: 'Đã xóa thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.mesage, res);
            }
        });
    }
}
exports.default = ProductCtrl;
