const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

router.get("/", async (req, res) => {
  try {
    const masterclasses = await prisma.masterclass.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    res.status(200).json(masterclasses);
  } catch (err) {
    console.error("Error fetching masterclasses:", err);
    res.status(500).json({ error: "Failed to fetch masterclasses" });
  }
});


module.exports = router;