import { Router } from "express";
import { userModel } from "../db/db";

import bcrypt from 'bcrypt'
import crypto from 'crypto'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'

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

        const hashedPassword = await bcrypt.hash(password, 10)

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

//@ts-ignore
userRouter.get('/verify/:token', async (req, res) => {
    // get token from url
    // validate token
    // find user based on token
    // check if not 
    // set isVerified field to true & save
    // return response

    //@ts-ignore
    const { token } = req.params;
    if (!token) {
        return res.status(400).json({
            message: "Invalid Token"
        })
    }

    try {

        const user = await userModel.findOne({ verificationToken: token})
        if (!user) {
            return res.status(400).json({
                message: "Invalid Token"
            })
        }

        user.isVerified = true;
        user.verificationToken = null;
        await user.save();

        res.status(200).json({
            message: "User verified successfully",
            success: true
        })


    } catch (error) {
        res.status(400).json({
            message: "User is not verified",
            error: error,
            success: false
        })
    }

})

//@ts-ignore
userRouter.post("/login", async (req, res) => {

    const { email, password } = req.body;
    if( !email || !password ) {
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                message: "Invalid email or password"
            });
        }

        //@ts-ignore
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid password"
            })
        }

        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET || "default-secret")

        res.cookie("Token", token, {httpOnly: true, secure: true})

        res.status(400).json({
            message: "User logged in successfully",
            success: true,
            token: token
        })

    } catch (error) {
        res.status(400).json({
            message: "User not loggedin",
            success: false,
            error: error
        });
    }
})

export { userRouter };

