"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleExceptions_1 = __importDefault(require("../../../utils/handleExceptions"));
const jwt_controller_1 = __importDefault(require("../controllers/jwt.controller"));
class JwtMiddleware {
    constructor() {
        this.jwtFlow = new jwt_controller_1.default();
    }
    refreshAccessTokenMiddleware(req, res, next) {
        try {
            let refresh_token = req.cookies.refreshtoken;
            if (!refresh_token) {
                this.jwtFlow.createRefreshToken({ id: req.body.id }, res);
                refresh_token = req.cookies.refreshtoken;
            }
            req.body.refresh_token = refresh_token;
            next();
        }
        catch (e) {
            (0, handleExceptions_1.default)(500, e.message, res);
        }
    }
}
exports.default = JwtMiddleware;
