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
const handleExceptions_1 = __importDefault(require("../../../utils/handleExceptions"));
const account_model_1 = __importDefault(require("../models/account.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AccountController {
    getAccountInformation(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield account_model_1.default.findOne({ _id: req.body._id }, (e, account) => __awaiter(this, void 0, void 0, function* () {
                    if (e) {
                        (0, handleExceptions_1.default)(400, e.message, res);
                        return;
                    }
                    res.json({ account });
                })).select('-password').clone().catch((e) => (0, handleExceptions_1.default)(400, e.message, res));
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    updateAccountBasicInfor(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const accountUpdate = req.body;
                yield account_model_1.default.findOneAndUpdate({ _id: req.body._id }, Object.assign({}, accountUpdate));
                res.json({ message: 'Cập nhập thông tin thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    updateAccountPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { newPassword } = req.body;
                const passwordHash = yield bcrypt_1.default.hash(newPassword, 8);
                yield account_model_1.default.findOneAndUpdate({ _id: req.body._id }, { password: passwordHash });
                res.json({ message: 'Cập nhập mật khẩu thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    userForgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    userResetPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
}
exports.default = AccountController;
