import Joi from "joi";


export const userRegisterSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4).max(30),
    confirmPassword: Joi.string().required().min(4).max(30),
});

export const userLoginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required().min(4).max(30),
})
