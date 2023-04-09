"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProductHttpCache = void 0;
const maxAge = 60 * 60;
function getProductHttpCache(req, res, next) {
    if (req.method == 'GET') {
        res.set('Cache-control', `public, max-age=${maxAge}`);
    }
    next();
}
exports.getProductHttpCache = getProductHttpCache;
