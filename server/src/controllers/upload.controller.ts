import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import FormData from "form-data";
import axios from 'axios';
import History from "../models/History.models";
import { MLPredictionSchema } from "../validators/prediction.schema";
import env from "../config/env";

export const uploadImage = async (req: AuthRequest, res: Response) => {
  try {
    const file = (req as any).file
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
    }

    // S0. CHECK ML SERVICE AVAILABILITY (if model is down, show dummy result)
    if (!env.FAST_API_URL) {
      return {
        label: "Tulasi",
        confidence: 0.94,
        info: {
          "name": "Tulsi",
          "scientific_name": "Ocimum tenuiflorum",
          "habitat": "Home gardens, pots and temple courtyards with regular watering and bright light in warm climates",
          "origin": "Native to the Indian subcontinent and central to religious and medicinal cultivation across South Asia",
          "description": "A revered basil species with strong aromatic leaves used in daily worship and traditional remedies for respiratory and digestive health; commonly cultivated in households."
        }
      };
    }

    // S1. SEND IMAGE TO MODEL
    // Create formData for predict request to FastAPI
    const formData = new FormData();
    const modelType = req.body.modelType;
    const image = req.file.buffer;

    if (modelType !== "bird" &&
      modelType !== "animal" &&
      modelType !== "plant"
    ) {
      res.status(400).json({ error: "Invalid modelType" });
      return;
    }

    // append image & modelType
    formData.append("image", image, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });
    formData.append("modelType", modelType);

    // Send req to fastapi microservice
    const FAST_URL = process.env.FAST_API_URL ||
      `http://localhost:5000/predict`;


    // S2. GET PREDICTION RESULTS
    const result = await axios.post(
      FAST_URL,
      formData,
      { headers: formData.getHeaders() }
    );

    // axios calls are auto res.json()-ed
    // result.data =  {
    //     "label": label,
    //     "confidence": confidence,
    //     "info": species_info
    // }
    const response = result.data;
    if (response.error) {
      res.status(500).json({ error: response.error });
      return;
    }


    // S3. ADD PREDICTION RECORD TO HISTORY
    // parse req.body safely (zod validates req body)
    const validateResponse = MLPredictionSchema.safeParse(response);

    if (!validateResponse.success) {
      res.status(500).json({ error: "Prediction validation failed" });
      return;
    }

    const prediction = {
      label: response.label,
      confidence: response.confidence,
    };
    const { uid, name } = req.user!;

    const history = await History.create({
      uid,
      modelType,
      prediction
    });

    res.json({
      name,
      label: response.label,
      confidence: response.confidence,
      info: response.info,
    });
  } catch (err) {
    // console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Server error" });
    }
    return;
  }
};