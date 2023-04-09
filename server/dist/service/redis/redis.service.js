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
exports.postToExistingCache = exports.updateExistingCache = exports.deleteDataFromCache = exports.getMultipleEntries = exports.getDataFromCache = exports.saveDataToCache = void 0;
const redisConnection_1 = __importDefault(require("./redisConnection"));
//expire time is second
const saveDataToCache = (key, value, expireTime) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (expireTime) {
            yield redisConnection_1.default.set(key, value, { EX: expireTime });
        }
        else {
            yield redisConnection_1.default.set(key, value, { KEEPTTL: true });
        }
        return "Data is saved!";
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.saveDataToCache = saveDataToCache;
const getDataFromCache = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield redisConnection_1.default.get(key);
        return data;
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.getDataFromCache = getDataFromCache;
const getMultipleEntries = (keys) => __awaiter(void 0, void 0, void 0, function* () {
    const entries = yield redisConnection_1.default.mGet(keys);
    return entries;
});
exports.getMultipleEntries = getMultipleEntries;
const deleteDataFromCache = (key) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield redisConnection_1.default.del(key);
    }
    catch (e) {
        throw new Error(e);
    }
});
exports.deleteDataFromCache = deleteDataFromCache;
const updateExistingCache = (key, updateData) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield redisConnection_1.default.get(key);
    data = JSON.parse(data);
    if (key.includes("ratings")) {
        let ind = data === null || data === void 0 ? void 0 : data.findIndex((el) => (el === null || el === void 0 ? void 0 : el._id) === updateData._id);
        if (ind !== -1)
            data[ind] = Object.assign({}, updateData);
    }
});
exports.updateExistingCache = updateExistingCache;
const postToExistingCache = (key, postData) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield redisConnection_1.default.get(key);
    data = JSON.parse(data);
    yield redisConnection_1.default.set(key, JSON.stringify([...data, postData]));
});
exports.postToExistingCache = postToExistingCache;
