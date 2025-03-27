const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

router.get("/", async (req, res) => {
  try {

    const artworks = await prisma.artwork.findMany({
      include: {
        artist: {
          select: {
            id: true,
            name: true
          }
        }
      }
    });

    res.status(200).json(artworks);
  } catch (err) {
    console.error("Error fetching artworks:", err);
    res.status(500).json({ error: "Failed to fetch artworks" });
  }
});

// GET single artwork by ID
router.get("/:id", async (req, res) => {
  try {
    const artwork = await prisma.artwork.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        artist: true
      }
    });

    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }

    res.status(200).json(artwork);
  } catch (err) {
    console.error("Error fetching artwork:", err);
    res.status(500).json({ error: "Failed to fetch artwork" });
  }
});

module.exports = router;