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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const handleExceptions_1 = __importDefault(require("../../../utils/handleExceptions"));
class JwtFlow {
    constructor() {
        this.refreshAccessToken = (req, res) => {
            try {
                let refresh_token = req.body.refresh_token;
                jsonwebtoken_1.default.verify(refresh_token, String(process.env.JWT_REFRESH_TOKEN), (e, accountData) => __awaiter(this, void 0, void 0, function* () {
                    if (e) {
                        (0, handleExceptions_1.default)(400, e.message, res);
                        return;
                    }
                    const access_token = this.createAccessToken({ _id: accountData._id });
                    res.json({ access_token: access_token });
                }));
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        };
    }
    createAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, String(process.env.JWT_ACCESS_TOKEN), { expiresIn: '15m' });
    }
    createActiveToken(payload) {
        return jsonwebtoken_1.default.sign(payload, String(process.env.JWT_ACTIVE_TOKEN), { expiresIn: '5m' });
    }
    createRefreshToken(payload, res) {
        const refresh_token = jsonwebtoken_1.default.sign(payload, String(process.env.JWT_REFRESH_TOKEN), { expiresIn: '7d' });
        res.cookie('refreshtoken', refresh_token, {
            httpOnly: true,
            path: '/account/refresh_token',
            sameSite: 'strict',
            maxAge: 7 * 24 * 59 * 60 * 1000
            //7*24*60*60*1000 //1 wee
        });
        return refresh_token;
    }
}
exports.default = JwtFlow;
