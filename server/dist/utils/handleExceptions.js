"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleException(status, msg, res) {
    return res.status(status).json({ msg: msg });
}
exports.default = handleException;
