import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt"
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import ErrorHandler from "../utils/errorHandler.js";


// user registaion API : user can register its self with these parameters(username, email, password, name) 
// and it will store the password in the hashed form and genarate the token at the client side in cookie
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


export const userLogin = catchAsyncError(async (req, res, next) => {

    const { username, email, password } = req.body;


    if (!(username || email) || !password)
        return next(new ErrorHandler("All fields are required!", 400));

    const checkExits = await userModel.findOne({ $or: [{ username }, { email }] }).select("+passwordHash");
    console.log(checkExits)
    if (!checkExits) return next(new ErrorHandler("User does not exits!", 400));

    const isPasswordCorrect = await bcrypt.compare(password, checkExits.passwordHash)

    if (!isPasswordCorrect) return next(ErrorHandler("Password does not match!", 401));

    const userToken = jwt.sign({ _id: checkExits._id }, process.env.JWT_URI);

    await userModel.findByIdAndUpdate(checkExits._id, {
        isActive: true
    }, { new: true });

    res.status(200).cookie("token", userToken, {
        maxAge: 1000 * 60 * 60,
        httpOnly: true,
        secure: true
    }).json({
        success: true,
        message: "Login Successfull."
    });



})


// User Logout API : it will remove the token from the client side and user will be logout
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

