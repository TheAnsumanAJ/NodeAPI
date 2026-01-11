import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendCookie } from "../utils/features.js";
import mongoose from "mongoose";

export const getAllUsers = async (req,res)=>{

};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Missing fields" });
    }

    // fail fast if DB not connected
    if (mongoose.connection.readyState !== 1) {
      return res.status(503).json({ success: false, message: "Database not connected" });
    }

    // limit how long the DB will wait for this query (5s)
    const existing = await User.findOne({ email }).maxTimeMS(5000).exec();
    if (existing) {
      return res.status(409).json({ success: false, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    sendCookie(user, res, "Registered successfully", 201);
  } catch (err) {
    console.error("register error:", err);
    if (err.name === "MongoNetworkError" || /timed out/i.test(err.message)) {
      return res.status(503).json({ success: false, message: "Database timeout / network error" });
    }
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getMyProfile = (req,res)=>{
    
    res.status(200).json({
        success: true,
        user: req.user,
    });
   
};

export const login = async (req,res)=>{
    const { email,password } = req.body;
    const user = await User.findOne({email}).select("+password");

    if(!user){
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    const ismatch = await bcrypt.compare(password,user.password);

    if(!ismatch){
        return res.status(401).json({
            success: false,
            message: "Invalid password"
        });
    }

    sendCookie(user,res,`Logged in successfully ${user.name}`,200);
};

export const logout = (req,res) => {
    res.status(200).cookie("token","",{expires: new Date(Date.now())}).json({
        success: true,
        user:req.user,
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Production" ? true : false,
    });
};

