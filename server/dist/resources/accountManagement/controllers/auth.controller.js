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
const jwt_controller_1 = __importDefault(require("./jwt.controller"));
const sendEmail_1 = __importDefault(require("../../../utils/sendEmail"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const account_model_1 = __importDefault(require("../models/account.model"));
const jwtFlow = new jwt_controller_1.default();
class AuthController {
    userRegister(req, res) {
        try {
            const { email, password } = req.body;
            const activeToken = jwtFlow.createActiveToken({ email, password });
            //client url to active account
            const clientActiveUrl = `${process.env.CLIENT_URL}/active/${activeToken}`;
            (0, sendEmail_1.default)(email, clientActiveUrl, 'Nhấn vào link bên dưới để kích hoạt tài khoản');
            res.json({ message: 'Kiểm tra email của bạn để kích hoạt tài khoản' });
        }
        catch (e) {
            (0, handleExceptions_1.default)(500, e.message, res);
        }
    }
    activeAccountWithEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { password } = req.body;
                const passwordHash = yield bcrypt_1.default.hash(password, 8);
                const newAccountObj = Object.assign(Object.assign({}, req.body), { password: passwordHash });
                const newAccount = new account_model_1.default(newAccountObj);
                newAccount.save();
                res.json({ message: 'Kích hoạt tài khoản thành công, giờ bạn có thể đăng nhập' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    userLogin(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                account_model_1.default.findOne({ email }, (err, user) => __awaiter(this, void 0, void 0, function* () {
                    if (!user) {
                        (0, handleExceptions_1.default)(400, "Tài khoản chưa được đăng ký", res);
                        return;
                    }
                    const passwordMatch = yield bcrypt_1.default.compare(password, String(user.password));
                    if (!passwordMatch) {
                        (0, handleExceptions_1.default)(400, "Mật khẩu không chính xác", res);
                        return;
                    }
                    const access_token = jwtFlow.createAccessToken({ _id: user._id });
                    jwtFlow.createRefreshToken({ _id: user._id }, res);
                    res.json({ account: Object.assign(Object.assign({}, user._doc), { access_token }) });
                }));
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    userLogout(req, res) {
        res.json({ msg: 'Hi' });
    }
}
exports.default = AuthController;
