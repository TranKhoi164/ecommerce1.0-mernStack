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
const address_model_1 = __importDefault(require("./address.model"));
const mongoose_1 = __importDefault(require("mongoose"));
const { ObjectId } = mongoose_1.default.Types;
class AddressController {
    createNewAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newAddress = req.body.address;
                const newAddresssSave = new address_model_1.default(Object.assign({ account: new ObjectId(req.body._id) }, newAddress));
                yield newAddresssSave.save();
                res.json({ message: 'Thêm mới địa chỉ thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getUserAddressList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const addressList = yield address_model_1.default.find();
                res.json({ address_list: addressList });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    updateAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield address_model_1.default.findByIdAndUpdate(new ObjectId(req.params._id), Object.assign({}, req.body.address));
                res.json({ message: 'Cập nhập thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    deleteAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield address_model_1.default.findByIdAndDelete(req.body.address._id);
                res.json({ message: 'Xóa thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
}
exports.default = AddressController;
