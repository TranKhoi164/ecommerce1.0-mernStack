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
const subPage_model_1 = __importDefault(require("./subPage.model"));
class SubPageController {
    createSubPage(req, res) {
        try {
            const newSubPage = new subPage_model_1.default(req.body.page);
            newSubPage.save();
            res.json('Tạo trang mới thành công');
        }
        catch (e) {
            (0, handleExceptions_1.default)(500, e.message, res);
        }
    }
    getSubPageList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const pageList = yield subPage_model_1.default.find({});
                res.json({ page_list: pageList });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    deleteSubPage(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield subPage_model_1.default.findOneAndDelete({ _id: req.body.subPage._id });
                res.json('Xóa trang thành công');
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
}
exports.default = SubPageController;
