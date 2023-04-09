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
const order_model_1 = __importDefault(require("../order/order.model"));
const orderManagement_model_1 = __importDefault(require("./orderManagement.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Types;
class OrderManagementCtrl {
    // public async getOrdersByAccountId(req: Request, res: Response): Promise<void> {
    //   try {
    //     const orders = await OrderManagement.find({account: req.body._id})
    //     res.json({orders: orders})
    //   } catch (e: any) {
    //     handleException(500, e.message, res)
    //   }
    // }
    // .populate({
    //   path: 'cart',
    //   populate: [
    //     {
    //       path: 'inventory',
    //       select: '-quantity -_id -__v',
    //       populate: {
    //         path: 'product',
    //         select: 'name -_id'
    //       }
    //     },
    //     { path: 'shippingAddress', select: '-account  -_id -__v' }
    //   ],
    //   select: '-account',
    // })
    getOrderManagementInfor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log(req.body._id);
                const orderManagement = yield orderManagement_model_1.default.findOne({ account: req.body._id })
                    .populate({
                    path: 'pending accomplished beingShipped cancelled',
                    populate: [
                        {
                            path: 'inventory', select: '-_id -__v',
                            populate: { path: 'product', select: 'name -_id' }
                        },
                        { path: 'shippingAddress', select: '-account  -_id -__v' }
                    ],
                }).select('-__v -account');
                res.json({ order_management: orderManagement });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getOrdersInCart(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orderManagement_model_1.default.findOne({ account: req.body._id })
                    .populate({
                    path: 'pending',
                    select: '-accomplished -beingShipped -cancelled',
                    populate: [
                        {
                            path: 'inventory',
                            select: '-_id -__v',
                            populate: {
                                path: 'product',
                                select: 'name -_id'
                            }
                        },
                        { path: 'shippingAddress', select: '-account  -_id -__v' }
                    ],
                }).select(['-cancelled', '-accomplished', '-beingShipped', '-account']);
                res.json({ orders: orders });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getPurchasedOrdersOfAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orders = yield orderManagement_model_1.default.findOne({ account: req.body._id })
                    .populate([
                    {
                        path: 'beingShipped accomplished cancelled',
                        populate: [
                            {
                                path: 'inventory',
                                select: '-_id -__v',
                                populate: {
                                    path: 'product',
                                    select: 'name -_id'
                                }
                            },
                            { path: 'shippingAddress', select: '-account  -_id -__v' }
                        ],
                        select: '-account',
                    },
                ]).select(['-pending', '-account']);
                res.json({ orders: orders });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getPurchasedOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orderManagements = yield orderManagement_model_1.default.find({
                    $or: [
                        { beingShipped: { $exists: true, $ne: [] } },
                        { accomplished: { $exists: true, $ne: [] } },
                        { cancelled: { $exists: true, $ne: [] } },
                    ]
                })
                    .populate([
                    {
                        path: 'beingShipped accomplished cancelled',
                        populate: [
                            {
                                path: 'inventory',
                                select: '-_id -__v',
                                populate: {
                                    path: 'product',
                                    select: 'name -_id'
                                }
                            },
                            { path: 'shippingAddress', select: '-account  -_id -__v' },
                        ],
                        select: '-account'
                    },
                    { path: 'account', select: 'email fullName avatar ' },
                ]).select(['-pending']);
                res.json({ orderManagements: orderManagements });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    purchaseOrders(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { orders } = req.body;
                yield orderManagement_model_1.default.findOneAndUpdate({ account: req.body._id }, {
                    $pullAll: {
                        pending: orders
                    },
                    $addToSet: {
                        beingShipped: { $each: orders }
                    }
                });
                console.log(orders);
                yield order_model_1.default.updateMany({ _id: { $in: orders } }, { status: 'beingShipped' });
                res.json({ message: 'Request thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    confirmOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.body.order;
                yield orderManagement_model_1.default.findOneAndUpdate({ account: req.body._id }, {
                    $pull: {
                        beingShipped: _id
                    },
                    $addToSet: {
                        accomplished: _id
                    }
                });
                yield order_model_1.default.findOneAndUpdate({ _id: _id }, { status: 'accomplished' });
                res.json({ message: 'Đã xác nhận đơn hàng' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    cancelOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { _id } = req.body.order;
                yield orderManagement_model_1.default.findOneAndUpdate({ account: req.body._id }, {
                    $pull: {
                        beingShipped: _id
                    },
                    $addToSet: {
                        cancelled: _id
                    }
                });
                yield order_model_1.default.findOneAndUpdate({ _id: _id }, { status: 'cancelled' });
                res.json({ message: 'Đã hủy đơn hàng' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    pushOrder(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield orderManagement_model_1.default.findOneAndUpdate({ account: req.body._id }, { $push: { orders: req.params.order_id } }, { upsert: true });
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
                yield orderManagement_model_1.default.updateOne({ account: req.body._id }, {
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
exports.default = OrderManagementCtrl;
