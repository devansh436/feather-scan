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

type Prediction = {
  type: string;
  label: string;
  confidence: number;
};

type SpeciesInfo = {
  name: string;
  scientific_name: string;
  confidence?: number;
  habitat: string;
  origin: string;
  description: string;
  cached: boolean;
};

type ModelResponse = {
  type: string;
  label: string;
  confidence: number;
  info: object;
  error?: string;
  cached: boolean;
};

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
    formData.append("model_type", req.body.model_type)

    // send image to backend model
    const FAST_URL = process.env.FAST_API_URL || `http://localhost:5000/predict`;
    const pythonRes = await axios.post(FAST_URL, formData, {
      headers: formData.getHeaders(),
    });
    
    const data: ModelResponse = pythonRes.data;
    if (data.error) return res.status(500).json({ error: data.error });

    // send identified label to gemini
    const geminiAnswer = data.info;
    return res.json({ answer: geminiAnswer, bird: data.label, confidence: data.confidence, cached: data.cached });
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
