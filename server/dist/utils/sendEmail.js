"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const googleapis_1 = require("googleapis");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { CLIENT_CONSOLE_ID, CLIENT_CONSOLE_SECRET, CLIENT_CONSOLE_REFRESH, SENDER_EMAIL_ADDRESS, REDIRECT_URI } = process.env;
const oauth2Client = new googleapis_1.google.auth.OAuth2(CLIENT_CONSOLE_ID, CLIENT_CONSOLE_SECRET, REDIRECT_URI);
const sendEmail = (to, active_url, msg) => {
    oauth2Client.setCredentials({
        refresh_token: CLIENT_CONSOLE_REFRESH
    });
    const authAccessToken = oauth2Client.getAccessToken();
    const stmpTransport = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            type: 'OAuth2',
            user: String(SENDER_EMAIL_ADDRESS),
            clientId: String(CLIENT_CONSOLE_ID),
            clientSecret: String(CLIENT_CONSOLE_SECRET),
            refreshToken: String(CLIENT_CONSOLE_REFRESH),
            accessToken: String(authAccessToken),
        }
    });
    const mailOption = {
        from: SENDER_EMAIL_ADDRESS,
        to: to,
        subject: "KHOITT to you",
        html: `
      <div>
        <p>${msg}</p>
        <a href="${active_url}">Verify</a></br>
      </div>
    `
    };
    stmpTransport.sendMail(mailOption, (err, infor) => {
        if (err)
            console.log(err);
        else
            console.log(infor);
    });
};
exports.default = sendEmail;
