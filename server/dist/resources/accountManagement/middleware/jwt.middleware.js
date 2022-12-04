"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleExceptions_1 = __importDefault(require("../../../utils/handleExceptions"));
const jwt_controller_1 = __importDefault(require("../controllers/jwt.controller"));
const jwtFlow = new jwt_controller_1.default();
class JwtMiddleware {
    refreshAccessTokenMiddleware(req, res, next) {
        try {
            let refresh_token = req.cookies.refreshtoken;
            if (!refresh_token) {
                refresh_token = jwtFlow.createRefreshToken({ _id: req.body._id }, res);
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
