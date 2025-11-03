import Joi from "joi";

export const qrCodeValidationSchema = Joi.object({
    name: Joi.string().trim().min(2).max(50).required().messages({
        "string.empty": "Name is required",
        "string.min": "Name must be at least 2 characters",
    }),

    message: Joi.string().trim().max(500).required().messages({
        "string.empty": "Message is required",
    }),

    phoneNo: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        "string.empty": "Primary number is required",
        "string.pattern.base": "Enter a valid 10-digit phone number",
    }),

    secondNo: Joi.string().pattern(/^[0-9]{10}$/).allow("", null).messages({
        "string.pattern.base": "Enter a valid 10-digit secondary number",
    }),

    socialMedia: Joi.string().uri().required().messages({
        "string.empty": "Social media link is required",
        "string.uri": "Enter a valid URL for social media link",
    }),

    otherLink: Joi.string().uri().allow("", null).messages({
        "string.uri": "Enter a valid URL for other link",
    }),
});
