import mongoose from "mongoose";


const QRCodeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    primaryContactNumber: {
        type: String,
        required: true,
        trim: true
    },
    secondaryContactNumber: {
        type: String,
        trim: true
    },
    socialMediaLink: {
        type: String,
        required: true,
        trim: true
    },
    otherLink: {
        type: String,
        trim: true
    },
});

export const QrCodeModel = mongoose.model("QRCode", QRCodeSchema);