"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const address_controller_1 = __importDefault(require("./address.controller"));
const addressRoutes = (0, express_1.Router)();
const addressCtrl = new address_controller_1.default();
addressRoutes.post('/new_address', addressCtrl.createNewAddress);
addressRoutes.get('/address_detail', addressCtrl.getAddressDetail);
exports.default = addressRoutes;
