const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");
const verifyToken = require("../middleware/verify-token");

// Create a new artwork enquiry (protected route)
router.post("/", verifyToken, async (req, res) => {
  try {
    const { 
      subject,
      message,
      artworkId
    } = req.body;

    // Validation
    if (!subject || !message || !artworkId) {
      return res.status(400).json({ 
        error: "Subject, message, and artwork ID are required" 
      });
    }

    // Check if the artwork exists
    const artwork = await prisma.artwork.findUnique({
      where: { id: artworkId }
    });

    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    // Create the enquiry
    const enquiry = await prisma.artworkEnquiry.create({
      data: {
        userId: req.user.userId,
        subject,
        message,
        artworkId
      }
    });

    res.status(201).json({
      success: true,
      message: "Your artwork enquiry has been submitted successfully.",
      enquiryId: enquiry.id
    });
  } catch (err) {
    console.error("Error creating artwork enquiry:", err);
    res.status(500).json({ error: "Failed to create artwork enquiry" });
  }
});


module.exports = router;