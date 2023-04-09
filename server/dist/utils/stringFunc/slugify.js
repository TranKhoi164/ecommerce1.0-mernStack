"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.slugify = void 0;
const slugify = (str) => {
    return str.toLowerCase()
        .trim()
        .replace(/[\s_-]+/g, "-");
};
exports.slugify = slugify;
