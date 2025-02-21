"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const class_transformer_1 = require("class-transformer");
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const entity_1 = require("./entity");
const class_validator_1 = require("class-validator");
const services_1 = require("./services");
const authServices = new services_1.AuthServices();
exports.AuthController = {
    signin: (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const body = (0, class_transformer_1.plainToInstance)(entity_1.Login, req.body);
            const errors = await (0, class_validator_1.validate)(body);
            if (errors.length > 0) {
                const formattedError = errors.map((error) => ({
                    property: error.property,
                    message: error.constraints,
                }));
                res.status(400).json({ success: false, errors: formattedError });
                return;
            }
            const user = await authServices.signin(body);
            res.status(200).json({ success: true, data: user });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }),
    signup: (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const body = (0, class_transformer_1.plainToInstance)(entity_1.Register, req.body);
            const errors = await (0, class_validator_1.validate)(body);
            if (errors.length > 0) {
                const formattedError = errors.map((error) => ({
                    property: error.property,
                    message: error.constraints,
                }));
                res.status(400).json({ success: false, errors: formattedError });
                return;
            }
            const user = await authServices.signup(body);
            res.status(201).json({ success: true, data: user });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }),
    forgetPassword: (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const body = (0, class_transformer_1.plainToInstance)(entity_1.ForgetPassword, req.body);
            const errors = await (0, class_validator_1.validate)(body);
            if (errors.length > 0) {
                const formattedError = errors.map((error) => ({
                    property: error.property,
                    message: error.constraints,
                }));
                res.status(400).json({ success: false, errors: formattedError });
                return;
            }
            const user = await authServices.forgetPassword(body);
            res.status(200).json({ success: true, message: user });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }),
    verifyEmail: (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const body = (0, class_transformer_1.plainToInstance)(entity_1.Verify, req.body);
            const errors = await (0, class_validator_1.validate)(body);
            if (errors.length > 0) {
                const formattedError = errors.map((error) => ({
                    property: error.property,
                    message: error.constraints,
                }));
                res.status(400).json({ success: false, errors: formattedError });
                return;
            }
            const user = await authServices.verifyEmail(body);
            res.status(200).json({ success: true, data: user });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }),
    resendVerificationEmail: (0, express_async_handler_1.default)(async (req, res) => {
        try {
            const body = (0, class_transformer_1.plainToInstance)(entity_1.ForgetPassword, req.body);
            const errors = await (0, class_validator_1.validate)(body);
            if (errors.length > 0) {
                const formattedError = errors.map((error) => ({
                    property: error.property,
                    message: error.constraints,
                }));
                res.status(400).json({ success: false, errors: formattedError });
                return;
            }
            const user = await authServices.resendVerificationEmail(body);
            res.status(200).json({ success: true, message: user });
        }
        catch (error) {
            res.status(500).json({ success: false, error: error.message });
        }
    }),
};
//# sourceMappingURL=controller.js.map