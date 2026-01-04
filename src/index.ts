import express, { Request, Response } from "express"
import cors from "cors";
import multer, { memoryStorage } from "multer";
import dotenv from "dotenv";
import axios from 'axios';
import { GoogleGenAI, Model } from "@google/genai";
import FormData from 'form-data';

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;
const upload = multer({ storage: memoryStorage() });

if (!process.env.GEMINI_API_KEY) {
  throw new Error('GEMINI_API_KEY is missing.');
}
const API_KEY = process.env.GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey: API_KEY });

type BirdPrediction = {
  label: string;
  confidence: number;
};

type BirdInfo = {
  name: string;
  scientific_name: string;
  confidence?: number;
  habitat: string;
  origin: string;
  description: string;
};

type ModelResponse = {
  label: string;
  confidence: number;
  error?: string;
};

// Cache previous gemini outputs
const cache: Record<string, string> = {}

// Function to get bird details (bird -> prediction in json -> label, confidence)
async function getGeminiInfo(bird: BirdPrediction): Promise<BirdInfo | null> {
  if (cache.hasOwnProperty(bird.label)) {
    return JSON.parse(cache[bird.label]);
  }
  const TEXT_PROMPT =
    `Return information about the bird name = ${bird.label} & confidence = ${bird.confidence} as a plain JSON object.
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
    model: process.env.GEMINI_MODEL || 'gemini-2.5-flash',
    contents: TEXT_PROMPT,
  });

  // Extract the relevant data from the Gemini response
  let geminiAnswer = geminiResponse.candidates?.[0].content?.parts?.[0].text;
  if (!geminiAnswer) return null;
  
  let geminiData;
  if (geminiAnswer) {
    // create {label : answer} cache entry
    cache[bird.label] = geminiAnswer;
    try {
      geminiData = JSON.parse(geminiAnswer);
    } catch (e) {
      console.error("Failed to parse Gemini JSON:", geminiAnswer);
      geminiData = null;
    }
  }
  return geminiData;
}


// GET
app.get("/test", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

// POST
app.post("/upload", upload.single("image"), async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    // send image to backend model
    const FAST_URL = process.env.FAST_API_URL || `http://localhost:5000/predict`;
    const pythonRes = await axios.post(FAST_URL, formData, {
      headers: formData.getHeaders(),
    });
    
    const data: ModelResponse = pythonRes.data;
    if (data.error) return res.status(500).json({ error: data.error });

    // send identified label to gemini
    const geminiAnswer = await getGeminiInfo(data);
    return res.json({ answer: geminiAnswer, bird: data.label, confidence: data.confidence });
  } catch (err) {
    console.error(err);
    if (!res.headersSent) {
      return res.status(500).json({ error: "Server error" });
    }
  }
});


// LISTEN
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
