"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const envalid_1 = require("envalid");
function validateEnv() {
    (0, envalid_1.cleanEnv)(process.env, {
        NODE_ENV: (0, envalid_1.str)({
            choices: ['development', 'production']
        }),
        MONGO_URI: (0, envalid_1.str)(),
        PORT: (0, envalid_1.port)({ default: 5000 }),
        JWT_ACTIVE_TOKEN: (0, envalid_1.str)(),
        JWT_ACCESS_TOKEN: (0, envalid_1.str)(),
        JWT_REFRESH_TOKEN: (0, envalid_1.str)(),
    });
}
exports.default = validateEnv;
