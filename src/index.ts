import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";
import { exec } from "child_process";

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT;
// const HOST_URL = process.env.HOST_URL
const HOST_URL = "http://localhost"
const API_KEY = process.env.GAPI_KEY;
const upload = multer({ dest: "uploads/" });


// format gemini output
function formatGeminiOutput(text: string): string {
  // Convert **xyz** to <b>xyz</b>
  const boldFormatted = text.replace(/\*\*(.+?)\*\*/g, `<b style="color :rgb(127, 221, 255);">$1</b>`);
  // Remove leading "* " from lines
  const cleanText = boldFormatted.replace(/^\*\s+/gm, '');
  // Ensure proper new lines using <br> tags
  return cleanText.replace(/\n+/g, '<br>');
}


// predict species via model.py
async function getAIPrediction(imagePath : string): Promise<string> {
  return new Promise((resolve,reject) => (
    exec(`python main.py ${imagePath}`, (error, stdout, stderr) => {
      if (error) {
        console.error("Error:", error);
        reject(error.message);
      } else if (stderr) {
        console.error("Model stderr:", stderr);
        resolve(stdout.trim());
      } else {
        console.log(stdout.trim());
        resolve(stdout.trim());
      }
    })
  ));
}



app.get("/test", (req: Request, res: Response) => {
  res.send("Hello World");
});


app.post("/upload", upload.single("image"), (req: Request, res: Response) => {
  (async () => {
    try {
      if (!req.file) return res.status(400).json({ error: "No file uploaded" });

      const imagePath = req.file.path;
      const predictedBird = await getAIPrediction(imagePath);
      console.log("predictedBird = " + predictedBird);
      const TEXT_PROMPT = `Tell me about the bird ${predictedBird} in a brief, pointwise manner directly WITHOUT saying "Okay here is your answer ... ". Write in this format:
      Name : xyz
      Confidence : x%
      Scientific Name : abc
      Habitat : [Where it is generally found and any notable habitat details]
      Origin: [Geographical origin or native region]
      and so on...
      The attributes must be in bold.
      `;

      // Fetch response
      const geminiResponse = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          contents: [
            {
              parts: [
                { text: TEXT_PROMPT }
              ]
            }
          ]
        }
      );

      // Delete the uploaded file after processing
      fs.unlinkSync(req.file.path);

      // Extract the relevant data from the Gemini response
      let geminiAnswer = geminiResponse.data.candidates[0]?.content?.parts?.[0]?.text;
      // console.log("Gemini Response:\n", geminiAnswer);
      geminiAnswer = formatGeminiOutput(geminiAnswer);
      res.json({ answer: geminiAnswer });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  })();
});

app.listen(PORT, () => {
  console.log(`Server running on ${HOST_URL}:${PORT}`);
});
