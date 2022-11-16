"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const dotenv_1 = __importDefault(require("dotenv"));
const validateEnv_1 = __importDefault(require("./utils/validateEnv"));
dotenv_1.default.config();
(0, validateEnv_1.default)();
const app = new app_1.default(Number(process.env.PORT));
app.express.get('/', (req, res) => {
    res.send('Hello world');
});
app.listen();
