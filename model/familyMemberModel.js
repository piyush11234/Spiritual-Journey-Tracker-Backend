import mongoose from "mongoose";

const FamilyMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  relationship: { type: String, required: true },
  age: Number,
  mantras:{type:String,enum: ["Pratham Nam", "Satnam","Saarnam"]},
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
}, { timestamps: true });

export const FamilyMember = mongoose.model("FamilyMember", FamilyMemberSchema);
