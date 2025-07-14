import mongoose from "mongoose";

const userSchema = mongoose.Schema({

    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    PasswordHash: {
        type: String,
        required: true,
        select: false
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    phoneNumber: {
        type: String,
        trim: true
    },
    emergencyContactNumber: {
        type: String,
        required: false,
        trim: true
    },
    address: {
        street: { type: String, required: false, trim: true },
        city: { type: String, required: false, trim: true },
        state: { type: String, required: false, trim: true },
        zipCode: { type: String, required: false, trim: true },
        country: { type: String, required: false, trim: true },
    },
    emailVerified: {
        type: Boolean,
        default: false
    },
    pushNotificationTokens: {
        type: [String],
        default: []
    },
    role: {
        type: String,
        enum: ["user", "premium_user"],
        default: "user"
    },
    isActive: {
        type: Boolean,
        default: true
    },
    profilePictureURL: {
        type: String,
        required: false
    },
}, {
    timestamps: true
});

const userModel = mongoose.model("User", userSchema);