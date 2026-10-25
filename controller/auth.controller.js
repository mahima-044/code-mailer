import User from "../models/auth.model.js"
import mongoose from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

export const registerUser = async(req, res)=>{
    try {
        const {name, email, password, domain, skills} = 
        req.body
        if (!name || !email || !password){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }
        if(password.length < 8){
            return res.status(400).json({
                success: false,
                message: "Password should be 8 Characters"
            })
        }
        const existUser = await User.findOne({email})
        if(existUser){
            return res.status(400).json({
                success: false,
                message: "User already exist"
        })
    }
    const hashedPassword = await bcrypt.hash
    (password, 10)
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        domain,
        skills
    })
    return res.status(201).json({
        success: true,
        message: "User created Successfully",
        user
    })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        user
    })
        
    }

} 

export const loginUser = async(req,res)=>{
    try {
        const{email, password} = req.body
        const user = await User.findOne({email}).select('+password')
        if(!user){
        return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
        })
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return res.status(400).json({
        success: false,
        message: "Invalid Email or Password",
        })
    }
    const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET);
    return res.status(200).json({
        success: true,
        message: "Login successful",
        user,
        token
        })
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({
        success: false,
        message: "Internel Sever Error",
        })
    }
}