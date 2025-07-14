import mongoose from "mongoose";

const itemsSchema = mongoose.Schema({
    userID: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    qrCodeId: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    itemName: {
        type: String,
        required: true,
        trim: true,
        index: true
    },
    itemColor: {
        type: String,
        trim: true,
    },
    itemCategory: {
        type: String,
        trim: true,
        index: true
    },
    itemPhotoURLs: {
        type: [String],
        default: []
    },
    itemRewardOffered: {
        type: Number
    },
    status: {
        type: String,
        required: true,
        enum: ["registered", "lost", "found_reported", "returned"],
        default: "registered",
        index: true
    },
    lostDetails: {
        lostAt: { type: Date },
        location: {
            lat: Number,
            lng: Number,
            addressDescription: { type: String, trim: true }
        },
        lostCircumstances: { type: String, trim: true }
    },
    foundDetails: {
        foundAt: { type: Date },
        foundLocation: {
            lat: Number,
            lng: Number,
            addressDescription: { type: String, trim: true }
        },
        finderUserId: {
            type: mongoose.Schema.ObjectId,
            ref: "User"
        },
        finderContactInfo: {
            name: String,
            email: String,
            phoneNumber: String
        },
        returnMethod: {
            type: String,
            enum: ["Direct Pickup", "Shipping", "Meetup", "other"]
        },
        returnNotes: { type: String, trim: true }
    },
    chatSessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "ChatSession"
    }

}, {
    timestamps: true
});

const ItemModel = mongoose.model("Item", itemsSchema);