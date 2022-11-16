"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AccountController {
    getAccountInformation(req, res) {
        return res.json({ msg: 'hello world' });
    }
    updateAccount(req, res) {
        return res.json({ msg: 'hello world' });
    }
    userForgotPassword(req, res) {
        return res.json({ msg: 'hello world' });
    }
    userResetPassword(req, res) {
        return res.json({ msg: 'hello world' });
    }
}
exports.default = AccountController;
