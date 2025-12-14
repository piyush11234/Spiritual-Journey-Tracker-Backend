import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: [6, "Password must be at least 6 characters"],

        },

        // ✅ Basic Info
        phone: {
            type: String,

        },
        address: {
            type: String,

        },

        mantras:{type:String,enum: ["Pratham Nam", "Satnam","Sarname"],},

        family: [{ type: mongoose.Schema.Types.ObjectId, ref: "FamilyMember" }],
        
        // ✅ Profile Image
        profilePic: {
            type: String,
        },

        isVerified: { type: Boolean, default: false },
        isLoggedIn: { type: Boolean, default: false },
        token: { type: String, default: null },
        otp: { type: String, default: null },
        otpExpiry: { type: Date, default: null },
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

