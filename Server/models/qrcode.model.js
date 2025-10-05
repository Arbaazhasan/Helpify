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
    primaryNumber: {
        type: String,
        required: true,
        trim: true
    },
    secondaryNumber: {
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

const QRCodeModel = mongoose.model("QRCode", QRCodeSchema);