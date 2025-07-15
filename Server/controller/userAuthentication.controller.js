import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt"
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";


export const userRegistration = catchAsyncError(async (req, res, next) => {

    const { username, email, password, name } = req.body;

    if (!username || !email || !password || !name)
        return next(new ErrorHandler("All fields are required!", 400));

    const [isEmail, isUsername] = await Promise.all([
        userModel.findOne({ email }),
        userModel.findOne({ username })
    ]);

    if (isEmail)
        return next(new ErrorHandler("User Already exits!", 409));

    if (isUsername)
        return next(new ErrorHandler("username already exits!", 409));


    const hashedPassword = await bcrypt.hash(password, 10);

    const createUser = await userModel.create({
        name,
        email: email.toLowerCase(),
        username: username.toLowerCase(),
        passwordHash: hashedPassword,
    });

    const userToken = jwt.sign({ _id: createUser._id }, process.env.JWT_URI);

    res.status(200).cookie("token", userToken, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: true
    }).json({
        success: true,
        message: "User Successfully Registered."
    })
});


export const userLogout = catchAsyncError(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token)
        return next(new ErrorHandler("Token not provided", 401));

    const userId = jwt.verify(token, process.env.JWT_URI);

    const user = await userModel.findById({ _id: userId._id });

    if (!user)
        return next(new ErrorHandler("Unauthorized access || Invalid or expired token", 401));

    await userModel.findByIdAndUpdate(user._id, {
        isActive: false
    }, { new: true });

    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        secure: true
    }).json({
        success: true,
        message: "User logged out successfully"
    });


})

