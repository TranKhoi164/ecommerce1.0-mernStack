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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const validateAccount_1 = require("../../../utils/validate/validateAccount");
function checkIfAccountExistByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkAccount = yield account_model_1.default.findOne({ email: email });
        if (checkAccount) {
            return true;
        }
        else
            return false;
    });
}
class AuthMiddleware {
    registerMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                if (yield checkIfAccountExistByEmail(email)) {
                    (0, handleExceptions_1.default)(400, 'Tài khoản đã được tạo từ trước', res);
                    return;
                }
                if ((0, validateAccount_1.validateEmail)(email) == null || (0, validateAccount_1.validatePassword)(password) == null) {
                    (0, handleExceptions_1.default)(400, 'Thông tin cung cấp không hợp lệ', res);
                    return;
                }
                next();
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    activeAccountMiddleware(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const active_token = req.headers.authorization;
                if (!active_token) {
                    (0, handleExceptions_1.default)(400, 'Bạn chưa đăng ký', res);
                }
                jsonwebtoken_1.default.verify(String(active_token), String(process.env.JWT_ACTIVE_TOKEN), (err, accountData) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        (0, handleExceptions_1.default)(400, err.message, res);
                        return;
                    }
                    if (yield checkIfAccountExistByEmail(accountData.email)) {
                        (0, handleExceptions_1.default)(400, 'Tài khoản đã được tạo từ trước', res);
                        return;
                    }
                    req.body = accountData;
                    console.log(accountData);
                    next();
                }));
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    loginMiddleware(req, res, next) {
        const { email, password } = req.body;
        if ((0, validateAccount_1.validateEmail)(email) == null || (0, validateAccount_1.validatePassword)(password) == null) {
            (0, handleExceptions_1.default)(400, 'Thông tin cung cấp không hợp lệ', res);
            return;
        }
        next();
    }
    authUserMiddleware(req, res, next) {
        try {
            const access_token = req.headers.authorization;
            if (!access_token) {
                (0, handleExceptions_1.default)(400, 'Chưa được cấp quyền', res);
                return;
            }
            jsonwebtoken_1.default.verify(access_token, String(process.env.JWT_ACCESS_TOKEN), (e, userData) => __awaiter(this, void 0, void 0, function* () {
                if (e) {
                    (0, handleExceptions_1.default)(400, e.message, res);
                    return;
                }
                req.body._id = userData._id;
                next();
            }));
        }
        catch (e) {
            (0, handleExceptions_1.default)(500, e.message, res);
        }
    }
}
exports.default = AuthMiddleware;
