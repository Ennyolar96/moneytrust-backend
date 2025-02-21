import { AuthController as ac } from "@/app/auth/controller";
import { Router } from "express";

const authRoute = Router();

authRoute.post("/auth/register", ac.signup);
authRoute.post("/auth/login", ac.signin);
authRoute.patch("/auth/verify", ac.verifyEmail);
authRoute.post("/auth/forget-password", ac.forgetPassword);
authRoute.patch("/auth/resend-otp", ac.resendVerificationEmail);

export default authRoute;
