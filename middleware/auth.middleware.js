import jwt from "jsonwebtoken"
import User from "../models/auth.model.js"

export const authMiddleware= async(req,res,next)=>{
    try {
        const token=req.headers.authorization.split(" ")[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        const user= await User.findById(decoded.userId)

        if(!user){
            return res.status(401).json({
                msg:"user not found"
            })
        }

        req.user=user
        next()


    } catch (error) {
        console.log("auth middleware error",error.msg)
        return res.status(500).json({
            msg:"token is required"
        })
    }
}