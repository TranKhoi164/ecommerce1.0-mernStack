"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { CLIENT_CONSOLE_ID, CLIENT_CONSOLE_SECRET, CLIENT_CONSOLE_REFRESH, SENDER_EMAIL_ADDRESS, SENDER_PASSWORD, REDIRECT_URI } = process.env;
const sendEmail = (to, active_url, msg) => {
    return new Promise((resolve, reject) => {
        try {
            let transporter = nodemailer_1.default.createTransport({
                service: 'gmail',
                auth: {
                    user: String(SENDER_EMAIL_ADDRESS),
                    pass: String(SENDER_PASSWORD),
                }
            });
            const mailOption = {
                from: SENDER_EMAIL_ADDRESS,
                to: to,
                subject: "SHINEE to you",
                html: `
          <div>
            <p>${msg}</p>
            <a href="${active_url}">Verify</a></br>
          </div>
        `
            };
            transporter.sendMail(mailOption, (err, inf) => {
                if (err) {
                    reject(err);
                }
                if (inf) {
                    resolve(inf);
                }
            });
        }
        catch (e) {
            reject(e);
        }
    });
};
exports.default = sendEmail;
