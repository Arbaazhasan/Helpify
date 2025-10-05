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
    qrCodeIdArray: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "QRCode"
    }],
    profilePictureURL: {
        type: String,
    },

});

export const userModel = mongoose.model("User", userSchema);