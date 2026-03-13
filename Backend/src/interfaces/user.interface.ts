import mongoose from "mongoose"
import { HydratedDocument } from "mongoose";

export interface IUser{
    _id: mongoose.Types.ObjectId; 
    username: string;
    email: string;
    Password: string;
    ProfilePhotoUrl: string;
    profilePhotoPublicId: string
    role: "user" | "admin";
    isAccountVerified: boolean;
    verifyOTP: string;
    verifyOTPExpiresAt: number;
    resetOTP: string;
    resetOTPExpiresAt: number;
    comparePassword(Password: string): Promise<boolean>;
}

export interface createUserDTO{
    username: string;
    email: string;
    Password: string;
    confirmPassword: string,
    role?: "user" | "admin"
}

export type UserDocument = HydratedDocument<IUser>;