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
const mongoose_1 = __importDefault(require("mongoose"));
const handleExceptions_1 = __importDefault(require("../../utils/handleExceptions"));
const slugify_1 = require("../../utils/stringFunc/slugify");
const subPage_model_1 = __importDefault(require("./subPage.model"));
const page_model_1 = __importDefault(require("../page/page.model"));
const { ObjectId } = mongoose_1.default.Types;
class SubPageController {
    createSubPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, page } = req.body.sub_page;
                const newSubPage = new subPage_model_1.default({ name: name, page: new ObjectId(page), slug: (0, slugify_1.slugify)(req.body.sub_page.name) });
                newSubPage.save();
                yield page_model_1.default.updateOne({ _id: page }, { $push: { subPages: newSubPage._id } });
                res.json({ message: 'Tạo trang con thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getSubPageBySlug(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { page_slug, subPage_slug } = req.params;
                console.log(page_slug, subPage_slug);
                page_model_1.default.findOne({ slug: page_slug }, (err, page) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        (0, handleExceptions_1.default)(400, err.message, res);
                        return;
                    }
                    const subPage = yield subPage_model_1.default.findOne({ page: page === null || page === void 0 ? void 0 : page._id, slug: subPage_slug })
                        .populate('page', 'name')
                        .populate({
                        path: 'categories',
                        populate: { path: 'subCategories' },
                        select: 'name subCategories subPage'
                    });
                    res.json({ sub_page: subPage });
                }));
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getSubPageListByPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pageId = req.params.page_id;
                const pageList = yield subPage_model_1.default.find({ page: pageId });
                res.json({ sub_page_list: pageList });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    getSubPageList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const subPageList = yield subPage_model_1.default.find({})
                    .populate('page', 'name')
                    .populate({
                    path: 'categories',
                    populate: { path: 'subCategories' },
                    select: 'name subCategories subPage'
                });
                res.json({ sub_page_list: subPageList });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    deleteSubPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield subPage_model_1.default.findOneAndDelete({ _id: req.body.sub_page._id });
                res.json({ message: 'Xóa trang con thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
}
exports.default = SubPageController;
