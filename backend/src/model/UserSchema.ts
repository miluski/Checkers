import mongoose from "mongoose";

export const userModel = mongoose.model(
    "User",
    new mongoose.Schema({
        email: String,
        password: String,
        nickname: String,
    })
);