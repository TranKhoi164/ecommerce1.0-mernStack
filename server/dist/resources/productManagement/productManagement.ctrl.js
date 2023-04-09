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
const productManagement_model_1 = __importDefault(require("./productManagement.model"));
class ProductManagementCtrl {
    getOrdersByAccountId(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield productManagement_model_1.default.find({ account: req.body._id })
                    .populate({
                    path: 'orders',
                    populate: [
                        {
                            path: 'inventory',
                            select: '-quantity -_id -__v',
                            populate: {
                                path: 'product',
                                select: 'name -_id'
                            }
                        },
                        { path: 'shippingAddress', select: '-account  -_id -__v' }
                    ],
                    select: '-account',
                });
                res.json({ orders: orders });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    pushOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield productManagement_model_1.default.findOneAndUpdate({ account: req.body._id }, { $push: { orders: req.params.order_id } }, { upsert: true });
                res.json({ message: 'Thêm đơn hàng thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    removeOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield productManagement_model_1.default.updateOne({ account: req.body._id }, {
                    $pullAll: {
                        orders: [req.params.order_id],
                    },
                });
                res.json({ message: 'Xóa đơn hàng thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
}
exports.default = ProductManagementCtrl;
