import { Visit } from "../model/placeModel.js";
import { FamilyMember } from "../model/familyMemberModel.js";

export const createPlace = async (req, res) => {
  try {
    const { visitType, place, date, purpose,mantras, customPurpose, familyMembers } = req.body;

    // Basic validation
    if (!visitType || !place || !date || !purpose || !mantras) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Purpose = Other → customPurpose is required
    if (purpose === "Other" && !customPurpose) {
      return res.status(400).json({ message: "Please provide custom purpose" });
    }

    let familyMemberIds = [];

    // If family visit → Save family members one by one
    if (visitType === "family" && Array.isArray(familyMembers)) {
      for (const member of familyMembers) {
        const savedMember = await FamilyMember.create({
          name: member.name,
          relationship: member.relationship,
          age: member.age,
          mantras:member.mantras,
          user: req.userId
        });
        familyMemberIds.push(savedMember._id);
      }
    }

    // Create Visit
    const visit = await Visit.create({
      user: req.userId,
      visitType,
      place,
      date,
      mantras,
      purpose,
      customPurpose: purpose === "Other" ? customPurpose : null,
      familyMembers: familyMemberIds
    });

    res.status(201).json({ message: "Visit saved", visit });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getALLPlaces = async (req, res) => {
  try {
    const visits = await Visit.find({ user: req.userId })
      .populate("familyMembers")  // <- add this
      .sort({ createdAt: -1 });

    res.status(200).json({ visits });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


export const getPlaceById = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id).populate("familyMembers");

    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }

    // // Ensure the user can only access their own visit
    // if (visit.user.toString() !== req.userId && !req.isAdmin) {
    //   return res.status(403).json({ message: "Access denied" });
    // }


    res.status(200).json({ visit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};


export const updatePlace = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }

    // Optionally check owner
    // if (visit.user.toString() !== req.userId) {
    //   return res.status(403).json({ message: "Access denied. You cannot edit this place." });
    // }

    const { visitType, place, date,mantras, purpose, customPurpose, familyMembers } = req.body;

    let familyMemberIds = [];

    // If family visit → handle family members
    if (visitType === "family" && Array.isArray(familyMembers)) {
      // Remove old family members
      await FamilyMember.deleteMany({ _id: { $in: visit.familyMembers } });

      // Create new family members
      for (const member of familyMembers) {
        const savedMember = await FamilyMember.create({
          name: member.name,
          relationship: member.relationship,
          age: member.age,
          mantras:member.mantras,
          user: req.userId
        });
        familyMemberIds.push(savedMember._id);
      }
    }

    // Update visit
    visit.visitType = visitType;
    visit.place = place;
    visit.date = date;
    visit.mantras=mantras,
    visit.purpose = purpose;
    visit.customPurpose = purpose === "Other" ? customPurpose : null;
    visit.familyMembers = visitType === "family" ? familyMemberIds : [];

    const updatedVisit = await visit.save();

    res.status(200).json({ message: "Visit updated successfully", visit: updatedVisit });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};




export const deletePlace = async (req, res) => {
  try {
    const visit = await Visit.findByIdAndDelete(req.params.id);
    if (!visit) {
      return res.status(404).json({ message: "Visit not found" });
    }
    res.status(200).json({ message: "Visit deleted" });


  } catch (error) {
    res.status(500).json({ message: error.message });


  }
}