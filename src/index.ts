import express, { Request, Response } from "express"
import cors from "cors";
import multer, { memoryStorage } from "multer";
import dotenv from "dotenv";
import axios from 'axios';
import { GoogleGenAI } from "@google/genai";
import FormData from 'form-data';

dotenv.config();
const app = express();
app.use(cors());
const PORT = process.env.PORT;
const API_KEY = process.env.GAPI_KEY;
const upload = multer({ storage: memoryStorage() });
const ai = new GoogleGenAI({ apiKey: API_KEY });

// Cache previous gemini outputs
const cache: Record<string, string> = {}

// Function to get bird details
async function getGeminiInfo(bird: any): Promise<string> {
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
    model: 'gemini-2.5-flash',
    contents: TEXT_PROMPT,
  });

  // Extract the relevant data from the Gemini response
  let geminiAnswer = geminiResponse.candidates?.[0].content?.parts?.[0].text || "No response.";
  let geminiData;
  if (geminiAnswer) {
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
  res.send("Hello World");
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
    const pythonRes = await axios.post("http://localhost:5000/predict", formData, {
      headers: formData.getHeaders(),
    });
    const data = pythonRes.data;
    if (data.error) return res.status(500).json({ error: data.error });

    // send identified label to gemini
    const geminiAnswer = await getGeminiInfo(data);
    res.json({ answer: geminiAnswer, bird: data.label, confidence: data.confidence });
    
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// LISTEN
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
