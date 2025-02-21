"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const helpers_1 = require("@/global/helpers");
const argon = __importStar(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const model_1 = require("@/global/model");
const mail_1 = require("@/global/mail");
class AuthServices {
    async signin(data) {
        try {
            const { encode } = this.passwordEncodeAndDecode();
            const user = await model_1.User.findOne({ email: data.email });
            if (!user) {
                throw new Error("Invalid email or password");
            }
            if (!user.isVerified) {
                await this.resendEmail(user.email, user.firstName);
                throw new Error("Please verify your email address");
            }
            if (!(await encode(user.password, data.password))) {
                throw new Error("Invalid email or password");
            }
            const { password, ...response } = user.toObject();
            const token = await this.generateToken(response);
            return { ...response, token };
        }
        catch (error) {
            throw error;
        }
    }
    async signup(data) {
        try {
            const user = await model_1.User.findOne({ email: data.email });
            if (user) {
                throw new Error("Email already in use");
            }
            const hashedPassword = await this.passwordEncodeAndDecode().decode(data.password);
            const verificationToken = (0, helpers_1.VerificationToken)(4);
            const verificationExpires = new Date(new Date().getTime() + 15 * 60 * 1000).getTime();
            const newUser = await model_1.User.create({
                ...data,
                password: hashedPassword,
                verificationToken,
                verificationExpires,
            });
            const { password, ...response } = newUser.toObject();
            await (0, mail_1.sendEmail)(mail_1.template.welcome, data.email, "Welcome", {
                username: response.username,
                token: verificationToken,
                currentYear: new Date().getFullYear(),
            });
            return response;
        }
        catch (error) {
            if (error.code === 11000) {
                throw new Error("Email or username already exists");
            }
            throw error;
        }
    }
    async forgetPassword(data) {
        try {
            const findUser = await model_1.User.findOne({ email: data.email });
            if (!findUser) {
                throw new Error("User not found");
            }
            const verificationToken = (0, helpers_1.VerificationToken)(4);
            const verificationExpires = new Date(new Date().getTime() + 15 * 60 * 1000).getTime();
            await model_1.User.updateOne({ _id: findUser._id }, { $set: { verificationToken, verificationExpires } });
            await (0, mail_1.sendEmail)(mail_1.template.forget, findUser.email, "Reset Password", {
                username: findUser.firstName,
                token: verificationToken,
                currentYear: new Date().getFullYear(),
            });
            return { message: "Reset password link sent to your email" };
        }
        catch (error) {
            throw error;
        }
    }
    async verifyEmail(data) {
        try {
            const user = await model_1.User.findOneAndUpdate({
                email: data.email,
                verificationToken: data.code,
                verificationExpires: { $gt: new Date().getTime() },
            }, {
                $set: {
                    isVerified: true,
                    verificationToken: null,
                    verificationExpires: null,
                },
            }, { new: true });
            if (!user) {
                throw new Error("Invalid token or token expired");
            }
            const { password, ...response } = user.toObject();
            const token = await this.generateToken(response);
            return { ...response, token };
        }
        catch (error) {
            throw error;
        }
    }
    async resendVerificationEmail(data) {
        try {
            const user = await model_1.User.findOne({ email: data.email });
            if (!user) {
                throw new Error("User not found");
            }
            await this.resendEmail(user.email, user.firstName);
            return "Verification email sent to your email";
        }
        catch (error) {
            throw error;
        }
    }
    async resendEmail(email, username) {
        try {
            const verificationToken = (0, helpers_1.VerificationToken)(4);
            const verificationExpires = new Date(new Date().getTime() + 15 * 60 * 1000).getTime();
            await model_1.User.updateOne({ email }, { $set: { verificationToken, verificationExpires } });
            await (0, mail_1.sendEmail)(mail_1.template.verify, email, `Verification your email ${username}`, {
                token: verificationToken,
                currentYear: new Date().getFullYear(),
            });
            return "Verification email sent successfully";
        }
        catch (error) {
            throw error;
        }
    }
    passwordEncodeAndDecode() {
        const decode = async (password) => {
            return await argon.hash(password);
        };
        const encode = async (user_password, password) => {
            return await argon.verify(user_password, password);
        };
        return { decode, encode };
    }
    async generateToken(data) {
        return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET, { expiresIn: "1d" });
    }
}
exports.AuthServices = AuthServices;
//# sourceMappingURL=services.js.map