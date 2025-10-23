import { userModel } from "../models/user.model.js";
import { ErrorHandler } from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import jwt from 'jsonwebtoken'

export const userAuthenticaiton = catchAsyncError(async (req, res, next) => {

    const { token } = req.cookies;

    if (!token) return next(new ErrorHandler("Login first!", 400));

    const decodeUser_id = jwt.verify(token, process.env.JWT_SECRET);

    const isUserExists = await userModel.findById(decodeUser_id._id);

    if (!isUserExists) return next(new ErrorHandler("Session Expired", 400));

    req.user = isUserExists;

    next();
});