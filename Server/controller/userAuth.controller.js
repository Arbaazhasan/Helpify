import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model";
import bcrypt from "bcrypt"
import { use } from "react";



export const register = async (req, res) => {

    try {

        const { username, email, password, name, address } = req.body;

        // checking all fields are coming form the client side
        if (!username || !email || !password || !name) return res.status(400).json({
            success: false,
            message: "Please enter all fileds! || all fields are required!"
        });

        const isEixts = await userModel.findOne({ email });

        if (isEixts) return res.status(409).json({
            success: false,
            message: "User already exits."
        });

        const hashedPassword = bcrypt.hash(password, 10);

        const user = await userModel.create({
            username,
            email,
            passwordHash: hashedPassword,
            name,
        });


        const token = jwt.sign({ _id: user._id }, process.env.JWT_URI);

        res.status(200).cookie("token", token, {
            maxAge: 1000 * 60 * 60,
            httpOnly: true,

        }).json({
            success: true,
            message: "Register successfully"
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: "Internal Server error.",
            error
        })
    }

}


