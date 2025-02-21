import { forgetPassword, IUser, login, register, verify } from "./entity";
export declare class AuthServices {
    signin(data: login): Promise<IUser>;
    signup(data: register): Promise<any>;
    forgetPassword(data: forgetPassword): Promise<{
        message: String;
    }>;
    verifyEmail(data: verify): Promise<IUser>;
    resendVerificationEmail(data: {
        email: string;
    }): Promise<String>;
    private resendEmail;
    private passwordEncodeAndDecode;
    private generateToken;
}
