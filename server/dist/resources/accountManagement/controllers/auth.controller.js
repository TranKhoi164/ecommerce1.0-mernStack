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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
            (0, sendEmail_1.default)(email, clientActiveUrl, 'Nhấn vào link bên dưới để kích hoạt tài khoản')
                .then(() => {
                res.json({ message: 'Kiểm tra email để kích hoạt tài khoản' });
            })
                .catch((e) => {
                (0, handleExceptions_1.default)(500, e.message, res);
                return;
            });
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
    sendResetPasswordEmail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                const user = yield account_model_1.default.findOne({ email });
                if (!user) {
                    res.status(400).json({ msg: "Người dùng chưa đăng nhập" });
                    return;
                }
                //payload: user email
                const active_token = jwtFlow.createAccessToken({ email: user === null || user === void 0 ? void 0 : user.email });
                const resetPassClientUrl = `${process.env.CLIENT_URL}/reset_password/${active_token}`;
                (0, sendEmail_1.default)(email, resetPassClientUrl, "Nhấn vào link bên dưới để tạo mật khẩu mới");
                res.json({ message: "Kiểm tra email để tạo mật khẩu mới" });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    resetPasswordWithAccessToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { active_token, password } = req.body;
                console.log('jwtactivetoken: ', process.env.JWT_ACCESS_TOKEN);
                password = yield bcrypt_1.default.hash(password, 8);
                jsonwebtoken_1.default.verify(active_token, String(process.env.JWT_ACCESS_TOKEN), (err, userData) => __awaiter(this, void 0, void 0, function* () {
                    if (err)
                        return (0, handleExceptions_1.default)(400, err.message + ' xin vui lòng thử lại', res);
                    yield account_model_1.default.findOneAndUpdate({ email: userData.email }, { password: password });
                    return res.json({ message: "Mật khậu đã được tạo, giờ bạn có thể đăng nhập" });
                }));
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    userLogout(req, res) {
        try {
            res.clearCookie('refreshtoken', { path: '/account/refresh_token' });
            res.json({ message: 'Đăng xuất thành công' });
        }
        catch (e) {
            (0, handleExceptions_1.default)(500, e.message, res);
        }
    }
}
exports.default = AuthController;
