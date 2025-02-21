export interface register {
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    role: Role;
    phoneNumber?: string;
    companyName?: string;
    businessType?: string;
    dateOfIncorporate?: Date;
}
export interface login {
    email: string;
    password: string;
}
export declare enum Role {
    Individual = "individual",
    Corporate = "corporate",
    Admin = "admin",
    SuperAdmin = "superAdmin"
}
export interface IUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phoneNumber: string;
    companyName: string;
    businessType: string;
    dateOfIncorporate: Date;
    role: Role;
    isVerified: boolean;
    verificationToken: number | null;
    verificationExpires: Date | null;
}
export interface verify {
    email: string;
    code: string;
}
export interface forgetPassword {
    email: string;
}
