"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingHttpCache = void 0;
const maxAge = 60 * 15;
function RatingHttpCache(req, res, next) {
    if (req.method == 'GET') {
        res.set('Cache-control', `public, max-age=${maxAge}`);
    }
    next();
}
exports.RatingHttpCache = RatingHttpCache;
