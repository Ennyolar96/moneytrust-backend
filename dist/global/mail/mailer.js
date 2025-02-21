"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const path_1 = __importDefault(require("path"));
const express_handlebars_1 = require("express-handlebars");
const promises_1 = __importDefault(require("fs/promises"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const hbs = (0, express_handlebars_1.create)({
    partialsDir: path_1.default.resolve("./template/partials"),
    defaultLayout: false,
    helpers: {},
});
const transporter = nodemailer_1.default.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: Boolean(process.env.MAIL_SECURE),
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});
const renderTemplate = async (templateName, context) => {
    const filePath = path_1.default.join(__dirname, "./template", `${templateName}.hbs`);
    const template = await promises_1.default.readFile(filePath, "utf-8");
    const compiledTemplate = hbs.handlebars.compile(template, {});
    return compiledTemplate(context);
};
const sendEmail = async (templateName, email, subject, context) => {
    try {
        const html = await renderTemplate(templateName, context);
        const mailOptions = {
            from: `"Fullstack test" <${process.env.MAIL_USER}>`,
            to: email,
            subject: subject,
            html: html,
        };
        const info = await transporter.sendMail(mailOptions);
        console.log(`Email sent: ${info.response}`);
    }
    catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw error;
    }
};
exports.sendEmail = sendEmail;
//# sourceMappingURL=mailer.js.map