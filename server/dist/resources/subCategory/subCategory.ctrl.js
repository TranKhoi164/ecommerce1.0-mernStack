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
const subCategory_model_1 = __importDefault(require("./subCategory.model"));
const slugify_1 = require("../../utils/stringFunc/slugify");
const category_model_1 = __importDefault(require("../category/category.model"));
class SubCategoryCtrl {
    createSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, category } = req.body.sub_category;
                const newSubCategory = new subCategory_model_1.default(Object.assign(Object.assign({}, req.body.sub_category), { slug: (0, slugify_1.slugify)(name) }));
                newSubCategory.save();
                yield category_model_1.default.updateOne({ _id: category }, { $push: { subCategories: newSubCategory._id } });
                res.json({ message: 'Tạo danh mục con thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getSubCategoryList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subCategoryList = yield subCategory_model_1.default.find({});
                res.json({ sub_category_list: subCategoryList });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    deleteSubCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield subCategory_model_1.default.findOneAndDelete({ _id: req.body.sub_category._id });
                res.json({ message: 'Xóa danh mục con thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
}
exports.default = SubCategoryCtrl;
