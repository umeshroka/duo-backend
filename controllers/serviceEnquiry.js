const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");
const verifyToken = require("../middleware/verify-token");

router.post("/", verifyToken, async (req, res) => {
  try {
    const { 
      subject,
      message,
      serviceId
    } = req.body;

    if (!subject || !message || !serviceId) {
      return res.status(400).json({ 
        error: "Subject, message, and service ID are required" 
      });
    }

    const service = await prisma.service.findUnique({
      where: { id: serviceId }
    });

    if (!service) {
      return res.status(404).json({ error: "Service not found" });
    }

    const enquiry = await prisma.serviceEnquiry.create({
      data: {
        userId: req.user.userId,
        subject,
        message,
        serviceId
      }
    });

    res.status(201).json({
      success: true,
      message: "Your service enquiry has been submitted successfully.",
      enquiryId: enquiry.id
    });
  } catch (err) {
    console.error("Error creating service enquiry:", err);
    res.status(500).json({ error: "Failed to create service enquiry" });
  }
});


module.exports = router;