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
      enquiryType,
      serviceId,
      masterclassId,
      artworkId
    } = req.body;

    // Validation
    if (!subject || !message || !enquiryType) {
      return res.status(400).json({ error: "Subject, message, and enquiry type are required" });
    }

    // Check that the corresponding ID is provided based on enquiry type
    if (
      (enquiryType === 'SERVICE' && !serviceId) ||
      (enquiryType === 'MASTERCLASS' && !masterclassId) ||
      (enquiryType === 'ARTWORK' && !artworkId)
    ) {
      return res.status(400).json({ 
        error: `${enquiryType.toLowerCase()} ID is required for this enquiry type` 
      });
    }

    // Create the enquiry
    const enquiry = await prisma.enquiry.create({
      data: {
        userId: req.user.userId,
        subject,
        message,
        enquiryType,
        serviceId: enquiryType === 'SERVICE' ? serviceId : null,
        masterclassId: enquiryType === 'MASTERCLASS' ? masterclassId : null,
        artworkId: enquiryType === 'ARTWORK' ? artworkId : null
      }
    });

    res.status(201).json({
      success: true,
      message: "Your enquiry has been submitted successfully.",
      enquiryId: enquiry.id
    });
  } catch (err) {
    console.error("Error creating enquiry:", err);
    res.status(500).json({ error: "Failed to create enquiry" });
  }
});

module.exports = router;