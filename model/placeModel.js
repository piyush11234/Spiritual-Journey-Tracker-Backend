import mongoose from "mongoose";

const VisitSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

  visitType: { type: String, enum: ["individual", "family"], required: true },

  place: { type: String, required: true },
  date: { type: Date, required: true },

  mantras:{type:String,enum: ["Pratham Nam", "Satnam","Saarnam"]},

  purpose: { type: String, required: true },  // removed enum for custom
  customPurpose: { type: String }, // used when purpose = Other

  familyMembers: [
    { type: mongoose.Schema.Types.ObjectId, ref: "FamilyMember" }
  ]
  
}, { timestamps: true });

export const Visit = mongoose.model("Visit", VisitSchema);
