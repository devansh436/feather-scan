/*
  src/controllers
  - this is where business logic lives
  - "what happens when this api is called?"
*/
import { AuthRequest } from "../middlewares/auth";
import { Response } from "express";
import History from "../models/History.models";
import { addHistoryRecordSchema } from "../validators/history.schema";

export const getHistory = async (req: AuthRequest, res: Response) => {
  try {
    // Extract uid from AuthRequest😈
    const uid = req.user!.uid;

    // Pagination - send data in chunks, not altogether
    const limit = 5;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;

    // Fetch userHistory by userId (returns array, sort by creation date)
    const userHistory = await History.find({ userId: uid })
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip(skip);

    // Get & send total count of history recs along w/ paginated data
    const totalCount = await History.countDocuments({ userId: uid });

    res.status(200).json({
      page,
      limit,
      totalCount,
      userHistory
    }); // empty arr if no history
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch records" });
  }
};


export const addRecord = async (req: AuthRequest, res: Response) => {
  try {
    // extract uid
    const uid = req.user!.uid;
    
    // parse req.body safely (zod validates req body)
    const parsed = addHistoryRecordSchema.safeParse(req.body);

    if (!parsed.success) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }
    
    const { modelType, prediction } = req.body;

    const history = await History.create({
      userId: uid,
      modelType,
      prediction
    });

    // 201 -> resource created successfully
    res.status(201).json(history);
  } catch (err) {
    // console.log(err);
    res.status(500).json({ error: "Failed to save history" });
  }
};


export const deleteRecord = async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const { doc_id } = req.params;
      
    const record = await History.findOne({ _id: doc_id, userId: uid });

    if (!record) {
      res.status(404).json({ error: "Record not found" });
      return;
    }

    await record.deleteOne();
    res.status(204).json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete record" });
  }
};
