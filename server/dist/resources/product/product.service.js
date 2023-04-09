"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProductService {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    filtering() {
        const queryObj = Object.assign({}, this.queryString);
        console.log({ before: queryObj });
        const excludedFields = ['page', 'sort', 'limit'];
        excludedFields.forEach((el) => delete queryObj[el]);
        console.log({ after: queryObj });
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(/\b(gte|gt|lt|lte|regex)\b/g, match => '$' + match);
        console.log({ queryObj, queryStr });
        return this;
    }
}
exports.default = ProductService;
