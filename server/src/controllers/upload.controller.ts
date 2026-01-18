import { Response } from "express";
import { AuthRequest } from "../middlewares/auth";
import FormData from "form-data";
import axios from 'axios';
import History from "../models/History.models";
import { MLPredictionSchema } from "../validators/prediction.schema";

export const uploadImage = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: "No file uploaded" });
      return;
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
      res.status(500).json({ error: "Internal server error" });
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
      history
    });
  } catch (err) {
    // console.error(err);
    if (!res.headersSent) {
      res.status(500).json({ error: "Server error" });
      return
    }
    return;
  }
};