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

router.get("/:id", async (req, res) => {
  try {
    const masterclass = await prisma.masterclass.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!masterclass) {
      return res.status(404).json({ error: "Masterclass not found" });
    }

    res.status(200).json(masterclass);
  } catch (err) {
    console.error("Error fetching masterclass:", err);
    res.status(500).json({ error: "Failed to fetch masterclass" });
  }
});

module.exports = router;