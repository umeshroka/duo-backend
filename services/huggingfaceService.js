// const fetch = require('node-fetch');
// const fs = require('fs');

// async function generateImage(prompt) {
//   try {
//     const response = await fetch(process.env.HUGGINGFACE_API_URL, {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({
//         inputs: prompt,
//         parameters: {
//           negative_prompt: "blurry, bad quality, distorted characters",
//           guidance_scale: 7.5,
//           num_inference_steps: 50
//         }
//       })
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.status} - ${await response.text()}`);
//     }

//     // Get the image data as a buffer
//     const imageBuffer = await response.buffer();
    
//     // Save the image
//     const imagePath = 'generated_calligraphy.png';
//     fs.writeFileSync(imagePath, imageBuffer);
    
//     console.log(`Image successfully saved to ${imagePath}`);
//     return imagePath;
//   } catch (error) {
//     console.error('Error generating image:', error);
//     throw error;
//   }
// }

// // Example prompt for Chinese calligraphy
// const prompt = "Traditional Chinese calligraphy art, black ink on plain rice paper with no background image, write a short couplet for 'chinese new year', detailed brush strokes, elegant style, cursive style" ;

// // Call the function
// generateImage(prompt)
//   .then(imagePath => console.log(`Process completed. Image saved to: ${imagePath}`))
//   .catch(error => console.error('Failed to generate image:', error));