"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function handleException(status, msg, res) {
    return res.status(status).json({ message: msg });
}
exports.default = handleException;
