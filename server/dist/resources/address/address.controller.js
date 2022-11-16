"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class addressController {
    createNewAddress(req, res) {
        return res.json({ addressId: 'new address id' });
    }
    getAddressDetail(req, res) {
        return res.json({ address: 'This is address' });
    }
}
exports.default = addressController;
