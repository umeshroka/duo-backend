const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");
const verifyToken = require("../middleware/verify-token");

// Create a new enquiry (protected route)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { 
      subject,
      message,
      masterclassId,
      selectedType
    } = req.body;

    // Validation
    if (!subject || !message || !masterclassId || !selectedType) {
      return res.status(400).json({ 
        error: "Subject, message, masterclass ID, and selected type are required" 
      });
    }

   // Check if the masterclass exists and supports the selected type
   const masterclass = await prisma.masterclass.findUnique({
    where: { id: masterclassId }
  });

  if (!masterclass) {
    return res.status(404).json({ error: "Masterclass not found" });
  }

  const validTypes = ["Individual", "Group", "Corporate"];
  if (!validTypes.includes(selectedType)) {
    return res.status(400).json({
      error: `Invalid type. Must be one of: ${validTypes.join(", ")}`
    });
  }

     // Create the enquiry
     const enquiry = await prisma.masterclassEnquiry.create({
      data: {
        userId: req.user.userId,
        subject,
        message,
        masterclassId,
        selectedType
      }
    });

    res.status(201).json({
      success: true,
      message: "Your masterclass enquiry has been submitted successfully.",
      enquiryId: enquiry.id
    });
  } catch (err) {
    console.error("Error creating masterclass enquiry:", err);
    res.status(500).json({ error: "Failed to create masterclass enquiry" });
  }
});

module.exports = router;