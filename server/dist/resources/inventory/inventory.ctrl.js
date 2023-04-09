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
const inventory_model_1 = __importDefault(require("./inventory.model"));
const handleExceptions_1 = __importDefault(require("../../utils/handleExceptions"));
const product_model_1 = __importDefault(require("../product/product.model"));
class InventoryCtrl {
    createInventory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { inventories, product_id } = req.body.inventories;
                let minPrice = 1000000000000, maxPrice = -1;
                let inventoriesTemp = [];
                for (let inventory of inventories) {
                    minPrice = Math.min(minPrice, inventory.price);
                    maxPrice = Math.max(maxPrice, inventory.price);
                    const inventoryData = new inventory_model_1.default(Object.assign(Object.assign({}, inventory), { product: product_id }));
                    yield inventoryData.save();
                    inventoriesTemp.push(inventoryData['_id'].toString());
                }
                yield product_model_1.default.findByIdAndUpdate(product_id, {
                    $push: { inventories: inventoriesTemp },
                    maxPrice: maxPrice,
                    minPrice: minPrice,
                });
                res.json({ message: 'Nhập thông tin kho thành công' });
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
    updateInventory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { inventory } = req.body;
                const updateInventory = yield inventory_model_1.default.findOne({ sku: inventory.sku, shippingAddress: inventory.shippingAddress });
                console.log('inventory: ', inventory);
                if ((updateInventory === null || updateInventory === void 0 ? void 0 : updateInventory.quantity) !== undefined && (inventory === null || inventory === void 0 ? void 0 : inventory.quantity) !== undefined) {
                    updateInventory.quantity = updateInventory.quantity - inventory.quantity;
                }
                yield (updateInventory === null || updateInventory === void 0 ? void 0 : updateInventory.save(function (err) {
                    if (err) {
                        return (0, handleExceptions_1.default)(400, err.message, res);
                    }
                }));
            }
            catch (e) {
                (0, handleExceptions_1.default)(500, e.message, res);
            }
        });
    }
}
exports.default = InventoryCtrl;
