const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

router.get("/", async (req, res) => {
  try {
    const editorials = await prisma.editorial.findMany({
      orderBy: {
        publishedAt: 'desc'
      }
    });

    res.status(200).json(editorials);
  } catch (err) {
    console.error("Error fetching editorials:", err);
    res.status(500).json({ error: "Failed to fetch editorials" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const editorial = await prisma.editorial.findUnique({
      where: {
        id: req.params.id
      }
    });

    if (!editorial) {
      return res.status(404).json({ error: "Editorial not found" });
    }

    res.status(200).json(editorial);
  } catch (err) {
    console.error("Error fetching editorial:", err);
    res.status(500).json({ error: "Failed to fetch editorial" });
  }
});

module.exports = router;