import { model, Schema } from "mongoose"
import { IAuthProvider, IUser, Role, IsActive } from "./user.interface"

const authProviderSchema = new Schema<IAuthProvider>({
    provider: { type: String, required: true },
    providerId: { type: String, required: true }
}, {
    versionKey: false,
    _id: false
})

const userSchema = new Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    phone: { type: String },
    picture: { type: String },
    address: { type: String },
    role: { type: String, enum: Object.values(Role), default: Role.Rider },
    isActive: { type: String, enum: Object.values(IsActive), default: IsActive.ACTIVE },
    auths: [authProviderSchema],

}, {
    timestamps: true,
    versionKey: false
})
export const User = model<IUser>("users", userSchema);