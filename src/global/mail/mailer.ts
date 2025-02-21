import nodemailer from "nodemailer";
import path from "path";
import { create } from "express-handlebars";
import fs from "fs/promises";
import dotenv from "dotenv";
dotenv.config();

const hbs = create({
  partialsDir: path.resolve("./template/partials"),
  defaultLayout: false,
  helpers: {},
});

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT),
  secure: Boolean(process.env.MAIL_SECURE), // Use true for port 465
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

const renderTemplate = async (
  templateName: string,
  context: Record<string, any>
) => {
  const filePath = path.join(__dirname, "./template", `${templateName}.hbs`);
  const template = await fs.readFile(filePath, "utf-8");
  const compiledTemplate = hbs.handlebars.compile(template, {});
  return compiledTemplate(context);
};

export const sendEmail = async (
  templateName: string,
  email: string,
  subject: string,
  context: Record<string, any>
) => {
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
  } catch (error: any) {
    console.error(`Error sending email: ${error.message}`);
    throw error;
  }
};
