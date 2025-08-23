import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import fsPromises from "fs/promises";
import dotenv from "dotenv";
import { spawn } from "child_process";
import { GoogleGenAI } from "@google/genai"

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT;
const API_KEY = process.env.GAPI_KEY;
const upload = multer({ dest: "uploads/" });

// Cache previous gemini outputs
const cache: Record<string, string> = {}

const ai = new GoogleGenAI({ apiKey: API_KEY });

async function getGeminiInfo(bird: string): Promise<string> {
  if (cache[bird]) return cache[bird];

  const TEXT_PROMPT =
`Return information about the bird ${bird} as a plain JSON object.
Do NOT include any markdown, code blocks, or extra text.
Use exactly these keys: "name", "scientific_name", "confidence", "habitat", "origin", "description".
Only return valid JSON, e.g.:

{
  "name": "Bald Eagle",
  "scientific_name": "Haliaeetus leucocephalus",
  "habitat": "Near large bodies of open water, forests",
  "origin": "North America",
  "description": "A large bird of prey known for its white head and tail."
}
`;


  // Fetch response
  const geminiResponse = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: TEXT_PROMPT,
  });

  // Extract the relevant data from the Gemini response
  let geminiAnswer = geminiResponse.candidates?.[0].content?.parts?.[0].text || "No response.";
  // console.log(geminiAnswer);
  let geminiData;
  if (geminiAnswer) {
    cache[bird] = geminiAnswer;
    try {
      geminiData = JSON.parse(geminiAnswer);
    } catch (e) {
      console.error("Failed to parse Gemini JSON:", geminiAnswer);
      geminiData = null;
    }
  }
  return geminiData;
}

// predict species via model.py
async function getAIPrediction(imagePath: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const py = spawn("python", ["main.py", imagePath]);

    let output = "";
    py.stdout.on("data", data => output += data.toString());
    py.stderr.on("data", err => console.error("Model stderr:", err.toString()));

    py.on("close", code => {
      if (code !== 0) reject("Python process failed");
      else resolve(output.trim());
    });
  });
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
      const geminiAnswer = await getGeminiInfo(predictedBird);
      // Delete the uploaded file after processing
      await fsPromises.unlink(req.file.path);
      res.json({ answer: geminiAnswer });

    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ error: "Server error" });
    }
  })();
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
