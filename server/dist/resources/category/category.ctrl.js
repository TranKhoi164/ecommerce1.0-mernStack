"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleExceptions_1 = __importDefault(require("../../utils/handleExceptions"));
const slugify_1 = require("../../utils/stringFunc/slugify");
const subCategory_model_1 = __importDefault(require("../subCategory/subCategory.model"));
const category_model_1 = __importDefault(require("./category.model"));
const subPage_model_1 = __importDefault(require("../subPage/subPage.model"));
class CategoryCtrl {
    createCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, subPage } = req.body.category;
                const newCategory = new category_model_1.default(Object.assign(Object.assign({}, req.body.category), { slug: (0, slugify_1.slugify)(name) }));
                newCategory.save();
                yield subPage_model_1.default.updateOne({ _id: subPage }, { $push: { categories: newCategory._id } });
                res.json({ message: 'Tạo danh mục thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getCategoryList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const categoryList = yield category_model_1.default.find({});
                res.json({ category_list: categoryList });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    deleteCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield category_model_1.default.findOneAndDelete({ _id: req.body.category._id });
                yield subCategory_model_1.default.deleteMany({ category: req.body.category._id });
                res.json({ message: 'Xóa danh mục thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
}
exports.default = CategoryCtrl;
