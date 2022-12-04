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
const validateAccount_1 = require("../../../utils/validate/validateAccount");
const account_model_1 = __importDefault(require("../models/account.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class AccountMiddleware {
    updateBasicMiddleware(req, res, next) {
        try {
            if (!(0, validateAccount_1.validateUsername)(req.body.username)) {
                (0, handleExceptions_1.default)(400, 'Tên đăng nhập không hợp lệ', res);
                return;
            }
            next();
        }
        catch (e) {
            (0, handleExceptions_1.default)(500, e.message, res);
        }
    }
    updatePasswordMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!(0, validateAccount_1.validatePassword)(req.body.newPassword)) {
                    (0, handleExceptions_1.default)(400, 'Mật khẩu không hợp lệ', res);
                    return;
                }
                const account = yield account_model_1.default.findOne({ _id: req.body._id });
                const checkPassword = yield bcrypt_1.default.compare(req.body.password, String(account === null || account === void 0 ? void 0 : account.password));
                if (!checkPassword) {
                    (0, handleExceptions_1.default)(400, 'Mật khẩu cung cấp không đúng', res);
                    return;
                }
                next();
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
}
exports.default = AccountMiddleware;
