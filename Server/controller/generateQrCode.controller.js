import mongoose from "mongoose";
import { catchAsyncError } from "../middleware/catchAsyncError.js";
import { QrCodeModel } from "../models/qrcode.model.js";
import { userModel } from "../models/user.model.js";
import { generateQrCodeSchema } from "../schemas/qrCode.schema.js";
import { ErrorHandler } from "../utils/errorHandler.js";

export const generateQrCode = catchAsyncError(async (req, res, next) => {


    const { name, message, primaryContactNumber, secondaryContactNumber, socialMediaLink, otherLink } = req.body;

    const validateData = generateQrCodeSchema.validate({ name, message, primaryContactNumber, secondaryContactNumber, socialMediaLink, otherLink });

    if (validateData.error) return next(new ErrorHandler("Error from GenerateQrCode Controller : " + validateData.error.message))

    const qrCode = await QrCodeModel.create({
        userId: req.user._id,
        name,
        message,
        primaryContactNumber,
        secondaryContactNumber,
        socialMediaLink,
        otherLink
    });

    if (!qrCode) return next(new ErrorHandler("Something went wrong!", 400));

    const isUserArrayUpdate = await userModel.findByIdAndUpdate(req.user._id, { $push: { qrCodeIdArray: qrCode._id } },
        { new: true }
    )

    res.status(200).json({
        success: true,
        message: qrCode._id
    })

});


export const deleteQRCode = catchAsyncError(async (req, res, next) => {
    const { _id } = req.body;

    if (!_id) return next(new ErrorHandler("QR Code ID is required", 400));
    if (!mongoose.Types.ObjectId.isValid(_id))
        return next(new ErrorHandler("Invalid QR Code ID format", 400));

    const isIdExists = await QrCodeModel.findById(_id);
    if (!isIdExists)
        return next(new ErrorHandler("QR Code does not exist", 404));

    const isDelete = await QrCodeModel.findByIdAndDelete(_id);
    if (!isDelete) return next(new ErrorHandler("Failed to delete QR Code", 500));

    await userModel.findByIdAndUpdate(
        isIdExists.userId,
        { $pull: { qrCodeIdArray: _id } },
        { new: true }
    );

    res.status(200).json({
        success: true,
        message: "QR Code deleted successfully",
    });
});


export const getAllQrCodes = catchAsyncError(async (req, res, next) => {

    const data = await QrCodeModel.find({ userId: req.user._id });

    res.status(200).json({
        success: true,
        message: data
    });
});

export const getOwnerDetail = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;

    const isQrExits = await QrCodeModel.findById(id);

    if (!mongoose.Types.ObjectId.isValid(id))
        return next(new ErrorHandler("Invalid QR Code ID format", 400));

    if (!isQrExits) return next(new ErrorHandler("QR Code does not exist", 404));

    res.status(200).json({
        success: true,
        message: isQrExits
    });

});


export const verifyOwnerWithKey = catchAsyncError(async (req, res, next) => {

    const { id } = req.params;
    const { key } = req.body;

    if (!key) return next(new ErrorHandler("Key required", 400));

    if (!mongoose.Types.ObjectId.isValid(id))
        return next(new ErrorHandler("Invalid QR Code ID format", 400));

    const isQrExits = await QrCodeModel.findById(id).populate("userId", "name email verificationKey");;

    if (!isQrExits) return next(new ErrorHandler("QR Code does not exist", 404));

    const user = isQrExits.userId;

    if (user.verificationKey !== key)
        return next(new ErrorHandler("Invalid verification key.", 400));

    res.status(200).json({
        success: true,
        message: "Owner verified successfully",
        data: {
            name: user.name,
            email: user.email,
        }
    });

});