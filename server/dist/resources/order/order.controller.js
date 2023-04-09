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
const order_model_1 = __importDefault(require("./order.model"));
const orderManagement_model_1 = __importDefault(require("../orderManagement/orderManagement.model"));
const inventory_model_1 = __importDefault(require("../inventory/inventory.model"));
class OrderCtrl {
    createOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, inventory, payment, shippingAddress, quantity } = req.body.order;
                console.log('body: ', req.body);
                const updateOrder = {
                    status: status, inventory: inventory, payment: payment, shippingAddress: shippingAddress
                };
                const newOrder = yield order_model_1.default.findOneAndUpdate({ account: req.body._id, inventory: inventory, shippingAddress: shippingAddress, status: 'pending' }, Object.assign(Object.assign({}, updateOrder), { $inc: { quantity: quantity } }), { new: true, upsert: true });
                yield orderManagement_model_1.default.findOneAndUpdate({ account: req.body._id }, { $addToSet: { [status]: newOrder._id } }, { upsert: true });
                yield newOrder.populate([
                    {
                        path: 'inventory',
                        select: '-_id -__v',
                        populate: {
                            path: 'product',
                            select: 'name -_id'
                        }
                    },
                    { path: 'shippingAddress', select: '-account  -_id -__v' }
                ]);
                res.json({ message: 'Tạo đơn hàng thành công', order: newOrder });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getOrderInfor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { order_id } = req.params;
                const order = yield order_model_1.default.findById(order_id).populate([
                    {
                        path: 'inventory',
                        select: '-__v',
                        populate: {
                            path: 'product',
                            select: 'name sku _id'
                        }
                    },
                    { path: 'shippingAddress', select: '-account  -_id -__v' },
                    { path: 'account', select: 'username email fullName' }
                ]);
                res.json({ order: order });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getPurchasedOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield order_model_1.default.find({ status: { $in: ['beingShipped', 'accomplished'] } })
                    .populate([
                    {
                        path: 'inventory',
                        select: '-_id -__v',
                        populate: {
                            path: 'product',
                            select: 'name sku -_id'
                        }
                    },
                    { path: 'shippingAddress', select: '-account  -_id -__v' },
                    { path: 'account', select: 'username email fullName' }
                ]);
                res.json({ products: products });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    updateOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const queryObj = req.query;
                let queryStr = JSON.stringify(queryObj);
                queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex|in|or|elemMatch|eq)\b/g, match => '$' + match);
                yield order_model_1.default.updateMany(JSON.parse(queryStr), Object.assign({}, req.body.order));
                res.json({ message: 'Cập nhập đơn hàng thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    deleteOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { status, _id } = req.body.order;
                console.log(status + ' ' + _id);
                yield inventory_model_1.default.findOneAndUpdate({});
                yield orderManagement_model_1.default.findOneAndUpdate({ account: req.body._id }, {
                    $pull: { [status]: _id }
                });
                yield order_model_1.default.findByIdAndDelete(req.body.order._id, (err, data) => __awaiter(this, void 0, void 0, function* () {
                    yield inventory_model_1.default.findByIdAndUpdate(data.inventory, {
                        $inc: { quantity: data.quantity }
                    });
                }));
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
}
exports.default = OrderCtrl;
