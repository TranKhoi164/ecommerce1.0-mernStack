"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const accountManagement_routes_1 = __importDefault(require("./resources/accountManagement/accountManagement.routes"));
const address_routes_1 = __importDefault(require("./resources/address/address.routes"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class App {
    constructor(port) {
        this.express = (0, express_1.default)();
        this.port = port;
        this.initializeMiddleware();
        this.initializeDatabaseConnection();
        this.initializeRouter();
    }
    initializeMiddleware() {
        this.express.use(express_1.default.json());
        this.express.use(express_1.default.urlencoded({ extended: false }));
        this.express.use((0, express_fileupload_1.default)({ useTempFiles: true }));
        this.express.use((0, cors_1.default)({ origin: process.env.CLIENT_URL }));
        this.express.use((0, cookie_parser_1.default)());
    }
    initializeRouter() {
        this.express.use('/account', accountManagement_routes_1.default);
        this.express.use('/address', address_routes_1.default);
    }
    initializeDatabaseConnection() {
        const mongoUrl = process.env.MONGO_URI;
        mongoose_1.default.connect(String(mongoUrl), (err) => {
            if (err)
                throw new Error(err);
            else
                console.log("Connect to mongodb");
        });
    }
    listen() {
        this.express.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
    }
}
exports.default = App;
