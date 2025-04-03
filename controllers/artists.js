const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

router.get("/featured", async (req, res) => {
    try {
      const featuredArtists = await prisma.artist.findFirst({
        where: {
          isFeatured: true
        },
        include: {
          artworks: {
            where: {
              isFeatured: true
            },
            take: 1
          }
        }
      });
      
      if (!featuredArtists) {
        return res.status(404).json({ error: "No featured artist found" });
      }
      
      res.status(200).json(featuredArtists);
    } catch (err) {
      console.error("Error fetching featured artist:", err);
      res.status(500).json({ error: "Failed to fetch featured artist" });
    }
  });

router.get("/", async (req, res) => {
  try {
    const artists = await prisma.artist.findMany({
      include: {
        artworks: {
          where: {
            isFeatured: true
          },
          take: 1
        }
      }
    });
    res.status(200).json(artists);
  } catch (err) {
    console.error("Error fetching artists:", err);
    res.status(500).json({ error: "Failed to fetch artists" });
  }
});


router.get("/:id", async (req, res) => {
  try {
    const artist = await prisma.artist.findUnique({
      where: {
        id: req.params.id
      },
      include: {
        artworks: true,
        mediaArticles: true
      }
    });

    if (!artist) {
      return res.status(404).json({ error: "Artist not found" });
    }

    res.status(200).json(artist);
  } catch (err) {
    console.error("Error fetching artist:", err);
    res.status(500).json({ error: "Failed to fetch artist" });
  }
});

module.exports = router;

