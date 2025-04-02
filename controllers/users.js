const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");
const verifyToken = require("../middleware/verify-token");

// GET user profile
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
        createdAt: true,
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user profile:", err);
    res.status(500).json({ error: "Failed to fetch user profile" });
  }
});

// Update user profile
router.put("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { firstName, lastName, phoneNumber } = req.body;

    // Validate the request
    if (req.body.hashedPassword || req.body.id || req.body.email) {
      return res
        .status(400)
        .json({ error: "Invalid fields in update request" });
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        phoneNumber,
      },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        phoneNumber: true,
      },
    });

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error("Error updating user profile:", err);
    res.status(500).json({ error: "Failed to update user profile" });
  }
});

// Delete user account
router.delete("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user.userId;

    // Delete all user related data
    // This needs to be done in a transaction to ensure all data is deleted
    await prisma.$transaction([
      // Delete all enquiries associated with the user
      prisma.artworkEnquiry.deleteMany({ where: { userId } }),
      prisma.serviceEnquiry.deleteMany({ where: { userId } }),
      prisma.masterclassEnquiry.deleteMany({ where: { userId } }),

      // Delete all AI artworks associated with the user
      prisma.aiArtwork.deleteMany({ where: { userId } }),

      // Finally, delete the user account
      prisma.user.delete({ where: { id: userId } }),
    ]);

    res.status(200).json({ message: "User account deleted successfully" });
  } catch (err) {
    console.error("Error deleting user account:", err);
    res.status(500).json({ error: "Failed to delete user account" });
  }
});

module.exports = router;
