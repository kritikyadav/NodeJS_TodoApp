/**
 * Models will contain all the db relaged logic like schema. 
 * 
 */

import mongoose from "mongoose";


const schema = new mongoose.Schema(
    {
        name: {
            type: String,
            unique: false,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            unique: false,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        }
    }
)

export const User = mongoose.model("User", schema);
