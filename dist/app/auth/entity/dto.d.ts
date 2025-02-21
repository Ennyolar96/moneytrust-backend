import { forgetPassword, login, register, Role, verify } from "./interface";
export declare class Register implements register {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role: Role;
    phoneNumber?: string;
    businessType?: string;
    companyName?: string;
    dateOfIncorporate?: Date;
}
export declare class Login implements login {
    email: string;
    password: string;
}
export declare class Verify implements verify {
    email: string;
    code: string;
}
export declare class ForgetPassword implements forgetPassword {
    email: string;
}
