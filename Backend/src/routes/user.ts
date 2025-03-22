import { Router } from "express";
import { userModel } from "../db/db";

import bcrypt from 'bcrypt'
import crypto from 'crypto'
import nodemailer from 'nodemailer'

const userRouter = Router();

//@ts-ignore
userRouter.post("/signup", async (req, res) => {

    // Get Data
    // Validate user
    // check if user already exist
    // create a new user in Database if user not exist
    // create a verification token
    // send token as email to user
    // send success status to user

    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(401).json({
            message: "All fields are required"
        })
    }

    try {
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(401).json({
                message: "User already exist"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 3)

        const user = await userModel.create({
            username,
            email,
            password: hashedPassword
        });

        if (!user) {
            return res.status(401).json({
                message: "User not registered"
            });
        }

        const token = crypto.randomBytes(32).toString("hex");
        // console.log(token);
        user.verificationToken = token;

        await user.save();


        // Send mail
        const transporter = nodemailer.createTransport({
            //@ts-ignore
            host: process.env.NODEMAILER_HOST,
            port: process.env.NODEMAILER_PORT,
            secure: false, // true for port 465, false for other ports
            auth: {
                user: process.env.NODEMAILER_USERNAME,
                pass: process.env.NODEMAILER_PASSWORD,
            },
        });

        

        const mailOption = {
            from: process.env.NODEMAILER_SENDEREMAIL,
            to: user.email,
            subject: "Verify your email", // Subject line
            text: `Please click on the following link:
            ${process.env.BASE_URL}/api/v1/users/verify/${token}
        `,
        };

        //@ts-ignore
        await transporter.sendMail(mailOption);



        res.status(201).json({
            message: "User registered successfully",
            success: true
        })

    } catch (error) {
        res.status(400).json({
            message: "User not registered from last catch ",
            success: false,
            error: error
        })
    }
})

userRouter.post("/login", (req, res) => {
    res.json({
        message: "login endpoint"
    })
})

export { userRouter };

