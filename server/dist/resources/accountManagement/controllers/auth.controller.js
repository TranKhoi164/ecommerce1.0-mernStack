"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleExceptions_1 = __importDefault(require("../../../utils/handleExceptions"));
class AuthController {
    userRegister(req, res) {
        return (0, handleExceptions_1.default)(400, 'Server is not corresponding', res);
    }
    userLogin(req, res) {
        return res.json({ msg: 'Hi' });
    }
    activeAccountWithEmail(req, res) {
        return res.json({ msg: 'Hi' });
    }
    userLogout(req, res) {
        return res.json({ msg: 'Hi' });
    }
}
exports.default = AuthController;
