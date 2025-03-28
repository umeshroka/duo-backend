const fetch = require('node-fetch');

async function generateImage(prompt) {
  try {
    const response = await fetch(process.env.HUGGINGFACE_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          negative_prompt: "blurry, bad quality, distorted characters",
          guidance_scale: 7.5,
          num_inference_steps: 50,
        },
      }),
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${await response.text()}`);
    }

    // Get the image data as a buffer
    const imageBuffer = await response.buffer();

    // Convert buffer to base64
    const base64Image = `data:image/png;base64,${imageBuffer.toString(
      "base64"
    )}`;

    console.log(`Image successfully generated!`);
    return base64Image;
  } catch (error) {
    console.error("Error generating image:", error);
    throw error;
  }
}

function createStructuredPrompt({
  artworkType,
  subjectPrompt,
  calligraphyStyle,
  paintingStyle,
  dynasty,
  technique,
}) {
  let basePrompt = "";

  if (artworkType === "CALLIGRAPHY_ONLY") {
    basePrompt = `Traditional Chinese calligraphy, ${
      calligraphyStyle || "elegant"
    } style, black ink on plain rice paper with no background image, writing: "${subjectPrompt}", detailed brush strokes`;

    if (dynasty) {
      basePrompt += `, ${dynasty} dynasty style`;
    }

    if (technique) {
      basePrompt += `, ${technique} technique`;
    }
  } else if (artworkType === "PAINTING_ONLY") {
    basePrompt = `Traditional Chinese ${
      paintingStyle || "landscape"
    } painting, "${subjectPrompt}", detailed brush strokes, ink wash on rice paper`;

    if (dynasty) {
      basePrompt += `, ${dynasty} dynasty style`;
    }

    if (technique) {
      basePrompt += `, ${technique} technique`;
    }
  } else if (artworkType === "PAINTING_WITH_CALLIGRAPHY") {
    basePrompt = `Traditional Chinese ${
      paintingStyle || "landscape"
    } painting with ${
      calligraphyStyle || "elegant"
    } calligraphy, painting shows "${subjectPrompt}", with calligraphy text, detailed brush strokes, ink wash on rice paper`;

    if (dynasty) {
      basePrompt += `, ${dynasty} dynasty style`;
    }

    if (technique) {
      basePrompt += `, ${technique} technique`;
    }
  }

  return (
    basePrompt + ", professional high-quality art, masterpiece, museum quality"
  );
}

module.exports = {
  generateImage,
  createStructuredPrompt,
};
