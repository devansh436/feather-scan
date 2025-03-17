import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const HOST_URL = process.env.HOST_URL
const API_KEY = process.env.GAPI_KEY;
const upload = multer({ dest: "uploads/" });

app.get("/test", (req: Request, res: Response) => {
  res.send("Hello World");
});

app.post("/upload", upload.single("image"), (req: Request, res: Response) => {
  (async () => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      // const TEXT_PROMPT = 
      // `
      //   ONLY tell me about this bird in this JSON format pls don't write anything else-
      //   {
      //     birdName : _,
      //     scientificName: _,
      //     habitat : _,
      //     description: _
      //   }
      // `;
      const TEXT_PROMPT = "Describe the bird image and tell me its name, scientific name, habitat, small description. ONLY use plain text and don't write response text";
      const imageBuffer = fs.readFileSync(req.file.path);
      const base64Image = imageBuffer.toString("base64");

      // Fetch response
      const geminiResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                { inlineData: { mimeType: req.file.mimetype, data: base64Image } },
                { text: TEXT_PROMPT }
              ]
            }
          ]
        }
      );

      // Delete the uploaded file after processing
      fs.unlinkSync(req.file.path);

      // Extract the relevant data from the Gemini response
      const geminiAnswer = geminiResponse.data.candidates[0]?.content?.parts?.[0]?.text;
      console.log("Gemini Response:\n", geminiAnswer);
      res.json({ answer: geminiAnswer });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  })();
});



app.listen(PORT, () => {
  console.log(`Server running on ${HOST_URL}${PORT}`);
});
