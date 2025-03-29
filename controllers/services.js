const express = require("express");
const router = express.Router();
const prisma = require("../lib/prisma");

router.get("/", async (req, res) => {
  try {
    const services = await prisma.service.findMany({});

    res.status(200).json(services);
  } catch (err) {
    console.error("Error fetching services:", err);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

module.exports = router;
