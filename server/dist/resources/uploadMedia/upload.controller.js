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
const cloudinary_1 = __importDefault(require("cloudinary"));
const account_model_1 = __importDefault(require("../accountManagement/models/account.model"));
const handleExceptions_1 = __importDefault(require("../../utils/handleExceptions"));
const fs_1 = __importDefault(require("fs"));
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
class UploadController {
    uploadAvatar(req, res) {
        var _a;
        const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
        cloudinary_1.default.v2.uploader.upload(file === null || file === void 0 ? void 0 : file.tempFilePath, {
            folder: 'ecommerce/avatar', width: 150, height: 150, crop: 'fill'
        }, (e, result) => __awaiter(this, void 0, void 0, function* () {
            if (e) {
                (0, handleExceptions_1.default)(400, e.message, res);
                return;
            }
            yield account_model_1.default.findOneAndUpdate({ _id: req.body._id }, { avatar: result.secure_url });
            res.json({ message: 'Cập nhập thành công' });
        }));
        fs_1.default.unlink(file === null || file === void 0 ? void 0 : file.tempFilePath, function (err) {
            if (err) {
                throw new Error(err);
            }
        });
    }
    uploadProductImage(req, res) {
        var _a;
        try {
            const file = (_a = req.files) === null || _a === void 0 ? void 0 : _a.file;
            cloudinary_1.default.v2.uploader.upload(file === null || file === void 0 ? void 0 : file.tempFilePath, {
                folder: 'ecommerce/product',
            }, (e, result) => __awaiter(this, void 0, void 0, function* () {
                if (e) {
                    (0, handleExceptions_1.default)(400, e.message, res);
                    return;
                }
                res.json({ image_url: result.secure_url, public_id: result.public_id });
            }));
            fs_1.default.unlink(file === null || file === void 0 ? void 0 : file.tempFilePath, function (err) {
                if (err) {
                    throw new Error(err);
                }
            });
        }
        catch (e) {
            (0, handleExceptions_1.default)(500, e.message, res);
        }
    }
    deleteImages(req, res) {
        try {
            //images is array of public_id
            const images = req.body.images;
            for (let image of images) {
                cloudinary_1.default.v2.uploader.destroy(image, (e, result) => {
                    if (e) {
                        (0, handleExceptions_1.default)(400, e.message, res);
                        return;
                    }
                });
            }
            res.json({ message: 'Xóa thành công' });
        }
        catch (e) {
            (0, handleExceptions_1.default)(500, e.message, res);
        }
    }
}
exports.default = UploadController;
