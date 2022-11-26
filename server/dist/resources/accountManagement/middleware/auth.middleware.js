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
function checkIfAccountExistByEmail(email, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkAccount = yield account_model_1.default.findOne({ email: email });
        if (checkAccount !== null) {
            return (0, handleExceptions_1.default)(400, 'Tài khoản đã được tạo từ trước', res);
        }
    });
}
class AccountMiddleware {
    registerMiddleware(req, res, next) {
        try {
            const { email } = req.body;
            checkIfAccountExistByEmail(email, res);
            next();
        }
        catch (e) {
            (0, handleExceptions_1.default)(500, e.message, res);
        }
    }
    activeAccountMiddleware(req, res, next) {
        try {
            const active_token = req.headers.authorization;
            if (!active_token) {
                (0, handleExceptions_1.default)(400, 'Token has been expired, register again', res);
            }
            jsonwebtoken_1.default.verify(String(active_token), String(process.env.JWT_ACTIVE_TOKEN), (err, accountData) => __awaiter(this, void 0, void 0, function* () {
                if (err)
                    (0, handleExceptions_1.default)(400, err, res);
                checkIfAccountExistByEmail(accountData.email, res);
                req.body = accountData;
                console.log(accountData);
                next();
            }));
        }
        catch (e) {
            (0, handleExceptions_1.default)(500, e.message, res);
        }
    }
}
exports.default = AccountMiddleware;
