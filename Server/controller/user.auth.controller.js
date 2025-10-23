import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { userModel } from "../models/user.model.js";
import { userLoginSchema, userRegisterSchema } from "../schemas/user.schema.js";
import { ErrorHandler } from "../utils/ErrorHandler.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const register = catchAsyncError(async (req, res, next) => {

    // const { name, email, password, confirmPassword } = req.body;
    const data = req.body;
    const validateData = userRegisterSchema.validate(data);

    // input validation 
    if (validateData.error) return next(new ErrorHandler(`Validation error from register controller : , ${validateData.error.message}`, 400));

    const { name, email, password } = data;

    // check user is already exists
    const isUserExits = await userModel.findOne({ email });

    if (isUserExits) return next(new ErrorHandler(`User already exists`, 409));

    // encrupt the passowrd
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate Verification key
    const verificationKey = Math.floor(Math.random() * 9000) + 1000 * new Date().getMilliseconds();

    // create user
    const user = await userModel.create({
        name,
        email,
        password: hashedPassword,
        verificationKey
    });

    if (!user) return next(new ErrorHandler(`Error From register controller : ${user}`));

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.status(201).cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        maxAge: 24 * 60 * 60 * 1000,
    }).json({
        success: true,
        message: "Successfully registered.",
        user
    });


});

export const login = catchAsyncError(async (req, res, next) => {

    const { email, password } = req.body;

    const validateData = userLoginSchema.validate({ email, password });

    if (validateData.error) return next(new ErrorHandler(`error from login : ${validateData.error.message}`, 400
    ))

    const isUserExists = await userModel.findOne({ email }).select('+password');

    if (!isUserExists) return next(new ErrorHandler("user does not exists", 404));

    const isPasswordMatched = await bcrypt.compare(password, isUserExists.password);

    if (!isPasswordMatched) return next(new ErrorHandler("Passoword not matched!", 400));

    const token = jwt.sign({ _id: isUserExists._id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
    });

    res.status(200).cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        httpOnly: true,
    }).json({
        success: true,
        message: "Successfully login"
    });

});


export const logout = catchAsyncError((req, res, next) => {

    res.status(200).clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    }).json({
        success: true,
        message: "Logout."
    });

});

