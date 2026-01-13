/*
  - src/index.ts
    - backend entry point
    - loads environment
    - initialises core services (db, auth)
    - wires middleware, routes
    - starts http server (app.listen)
    - fail fast if bootstrapping fails (fail fast = fast crash when critical err)
*/

import express, { Request, Response } from "express"
import cors from "cors";
import multer, { memoryStorage } from "multer";
import dotenv from "dotenv";
import axios from 'axios';
import FormData from 'form-data';
import admin from './config/firebase';
import connectDB from "./config/db";
import historyRoutes from './routes/history';

// Connect to mongoDB
connectDB();

// Load dotenv
dotenv.config();

// Create express app
const app = express();
app.use(cors());
app.use(express.json());
app.use('/history', historyRoutes);

const PORT = process.env.PORT || 3000;
const upload = multer({ storage: memoryStorage() });

type ModelResponse = {
  type: string;
  label: string;
  confidence: number;
  info: object;
  error?: string;
  cached: boolean;
};

/* ------------------ GET --------------------- */
// testing route
app.get("/test", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

/* ------------------ POST --------------------- */
// Image upload
app.post("/upload", upload.single("image"), async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    // Extract Authorization header from request
    const authHeader: string = req.headers.authorization || "";
    try {
      // Extract token from header
      const token = authHeader.split(' ')[1];

      // Verify token to ensure authorized access
      await admin.auth().verifyIdToken(token);
    } catch (err) {
      // console.log("Auth error", err);
      return res.status(401).json({ error: 'Authentication error.' });
    }

    // Create formData for predict request to FastAPI
    const formData = new FormData();
    formData.append("image", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    formData.append("model_type", req.body.model_type)

    // Send req to fastapi microservice
    const FAST_URL = process.env.FAST_API_URL || `http://localhost:5000/predict`;
    const result = await axios.post(FAST_URL, formData, {
      headers: formData.getHeaders(),
    });

    const response: ModelResponse = result.data;
    // console.log(response);
    if (response.error) return res.status(500).json({ error: response.error });

    return res.json({
      label: response.label,
      confidence: response.confidence,
      info: response.info,
    });

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
