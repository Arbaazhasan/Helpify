import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },

    password: {
        type: String,
        select: false,
        required: true,
    },
    picture: {
        type: String
    },
    qrCodeIdArray: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "QRCode"
    }],
    verificationKey: {
        type: String,
        required: true,
    }

}, { timestamps: true });

export const userModel = mongoose.model("User", userSchema);