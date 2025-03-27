const express = require("express");
const router = express.Router();
const verifyToken = require("../middleware/verify-token");
const { generateImage, createStructuredPrompt } = require("../services/huggingfaceService");

router.post("/generate", verifyToken, async (req, res) => {
  try {
    const { 
      artworkType, 
      subjectPrompt, 
      calligraphyStyle, 
      paintingStyle, 
      dynasty, 
      technique 
    } = req.body;

    if (!artworkType || !subjectPrompt) {
      return res.status(400).json({ error: "Artwork type and subject prompt are required" });
    }

    // Create the structured prompt for image generation
    const fullPrompt = createStructuredPrompt({
      artworkType,
      subjectPrompt,
      calligraphyStyle,
      paintingStyle,
      dynasty,
      technique
    });

    // Generate the image and get base64 data
    const imageData = await generateImage(fullPrompt);

    // Return the generated image data directly
    res.status(200).json({ 
      success: true,
      imageData,
      fullPrompt
    });
  } catch (err) {
    console.error("Error generating AI artwork:", err);
    res.status(500).json({ error: "Failed to generate AI artwork", details: err.message });
  }
});

module.exports = router;