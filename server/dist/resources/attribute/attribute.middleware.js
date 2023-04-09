"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAttributesMiddleware = void 0;
const maxAge = 60 * 60;
function getAttributesMiddleware(req, res, next) {
    if (req.method == 'GET') {
        res.set('Cache-control', `public, max-age=${maxAge}`);
    }
    next();
}
exports.getAttributesMiddleware = getAttributesMiddleware;
