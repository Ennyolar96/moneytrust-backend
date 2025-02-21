"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const controller_1 = require("../app/auth/controller");
const express_1 = require("express");
const authRoute = (0, express_1.Router)();
authRoute.post("/auth/register", controller_1.AuthController.signup);
authRoute.post("/auth/login", controller_1.AuthController.signin);
authRoute.patch("/auth/verify", controller_1.AuthController.verifyEmail);
authRoute.post("/auth/forget-password", controller_1.AuthController.forgetPassword);
authRoute.patch("/auth/resend-otp", controller_1.AuthController.resendVerificationEmail);
exports.default = authRoute;
//# sourceMappingURL=route.js.map