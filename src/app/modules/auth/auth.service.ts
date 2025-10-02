/* eslint-disable @typescript-eslint/no-explicit-any */

/* eslint-disable @typescript-eslint/no-non-null-assertion */
import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import jwt, { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/AppError";
import { createNewAccessTokenWithRefreshToken, CreateUserTokens  } from "../../utils/userTokens";
import { IUser } from "../user/user.interface";
import {User} from "../user/user.model";


const creadentialLogin = async (payload: Partial<IUser>) => {
      const { email, password } = payload;

      const isUserAvalible = await User.findOne({ email })
      const checkPass = await bcryptjs.compare(password as string, isUserAvalible?.password as string)
      if (!isUserAvalible) {
            throw new AppError(httpStatus.BAD_REQUEST, "This user does not exist please register", '')
      }
      if (!checkPass) {
            throw new AppError(httpStatus.BAD_REQUEST, "Wrong passowrd", "");

      }

      const usertokens = CreateUserTokens(isUserAvalible)

      const { password: pass, ...rest } = isUserAvalible.toObject();
      return {
            accessToken: usertokens.accessToken,
            refreshToken: usertokens.refreshToken,
            user: rest,
      }
}
const getNewAccessToken = async (refreshToken: string) => {
      const newAccessToken = await createNewAccessTokenWithRefreshToken(refreshToken)
      return {
            accessToken: newAccessToken,
      }
}
const resetPassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {
      const user = await User.findById(decodedToken.userId)
      const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user?.password as string)
      if (!isOldPasswordMatch) {
            throw new AppError(httpStatus.UNAUTHORIZED, "Old password dosn't match", "");

      }
      user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))
      user!.save();
}

const changePassword = async (oldPassword: string, newPassword: string, decodedToken: JwtPayload) => {

  const user = await User.findById(decodedToken.userId)

  const isOldPasswordMatch = await bcryptjs.compare(oldPassword, user!.password as string)
  if (!isOldPasswordMatch) {
    throw new AppError(httpStatus.UNAUTHORIZED, "Old Password does not match");
  }

  user!.password = await bcryptjs.hash(newPassword, Number(envVars.BCRYPT_SALT_ROUND))

  user!.save();


}

export const AuthServices = {
      creadentialLogin,
      getNewAccessToken,
      resetPassword,
      changePassword
}
