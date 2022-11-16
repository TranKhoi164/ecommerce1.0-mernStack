"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class JwtFlow {
    createAccessToken(payload) {
        return jsonwebtoken_1.default.sign(payload, String(process.env.JWT_ACCESS_TOKEN), { expiresIn: '5m' });
    }
    createActiveToken(payload) {
        return jsonwebtoken_1.default.sign(payload, String(process.env.JWT_ACTIVE_TOKEN), { expiresIn: '2m' });
    }
    createRefreshToken(payload) {
        return jsonwebtoken_1.default.sign(payload, String(process.env.JWT_REFRESH_TOKEN), { expiresIn: '5m' });
    }
    refreshAccessToken(req, res) {
        return res.json({ msg: 'Hello world' });
    }
}
exports.default = JwtFlow;
