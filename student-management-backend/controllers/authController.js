import Admin from "../models/admin.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


const generateToken = (id) => {
    const token = jwt.sign({id:id}, process.env.JWT_SECRET,{
        expiresIn: "7d"
    })
    return token
}

export const REGISTER = async(req,res) => {
    try{
        const{username,password} = req.body
        const existingAdmin = await Admin.findOne({username})
        
        if(existingAdmin)
            return res
            .status(400)
            .json({data:null, message: "Admin/User Already Exists"})

        const admin = await Admin.create({
            username,
            password: await bcrypt.hash(password,10)
        })

        const token = generateToken(admin._id)
        return res.status(201).json({
            message: "User Registered",
            data: {admin,token},
        })

    }catch(err){
        return res
        .status(500)
        .json({message: err.message})
    }
}

// LOGIN

export const LOGIN = async(req,res) => {
    try{

        const {username, password} = req.body
        const admin = await Admin.findOne({username})

        if(!admin){
            return res.status(404).json({
                message: "User not found",
                data: null,
            })
        }

        if(!(await bcrypt.compare(password, admin.password))){
            return res
            .status(400)
            .json({
                data:null,
                message: "Invalid Password"
            })
        }

        const token = generateToken(admin._id)

        return res
            .status(200)
            .json({
                data: {admin, token},
                message: "User LoggedIn"
            }
        )

    }catch(err){
        return res
        .status(500)
        .json({message: err.message})
    }
}