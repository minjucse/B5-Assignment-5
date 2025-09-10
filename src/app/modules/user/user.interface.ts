import { Types } from "mongoose";

export enum Role {
    Super_Admin = "Super_Admin",
    Admin = "Admin",
    Rider = "Rider",
    Driver = "Driver",
}


export interface IAuthProvider {
    provider: "google" | "credentials";  // "Google", "Credential"
    providerId: string;
}

export enum IsActive {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BLOCKED = "BLOCKED"
}

export interface IUser {
    _id?: Types.ObjectId
    name: string;
    email: string;
    password?: string;
    phone?: string;
    picture?: string;
    address?: string;
    isDeleted?: string;
    isActive?: IsActive;
    isVerified?: boolean;
    role: Role;
    auths: IAuthProvider[]
    bookings?: Types.ObjectId[]
    guides?: Types.ObjectId[]
}