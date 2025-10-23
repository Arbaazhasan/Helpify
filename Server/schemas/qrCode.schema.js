import Joi from "joi";

export const generateQrCodeSchema = Joi.object({

    name: Joi.string().min(3).max(30).required(),
    message: Joi.string().min(3).max(200).required(),
    primaryContactNumber: Joi.string().min(10).max(10).required(),
    secondaryContactNumber: Joi.string().min(10).max(10),
    socialMediaLink: Joi.string().min(5).required(),
    otherLink: Joi.string(),

})