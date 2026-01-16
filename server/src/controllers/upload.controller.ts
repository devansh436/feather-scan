import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import FormData from "form-data";
import axios from 'axios';


export const uploadImage = async (req: AuthRequest, res: Response): Promise<any> => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    // Create formData for predict request to FastAPI
    const formData = new FormData();
    formData.append("image", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    
    formData.append("model_type", req.body.model_type)

    // Send req to fastapi microservice
    const FAST_URL = process.env.FAST_API_URL ||
      `http://localhost:5000/predict`;

    const result = await axios.post(
      FAST_URL,
      formData,
      { headers: formData.getHeaders() }
    );

    // axios calls are auto res.json()-ed
    const response = result.data;
    if (response.error) {
      res.status(500).json({ error: response.error });
      return;
    }
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
};