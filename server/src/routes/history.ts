/*
  routes/history.ts
  - creates all endpoints related to history entity (db table)
  - this includes get, post, update, del, etc.
  - export this router to mount it on top of main server
*/
import { Router, Request, Response } from 'express';
import History from '../models/History';
import authMiddleWare from '../middleware/auth';
import { AuthRequest } from '../middleware/auth';

// A mini express app - lets u handle routes
const router = Router();

// All endpoints below go through middleware
router.use(authMiddleWare);

// Insert record in DB
router.post('/', async (req: AuthRequest, res: Response) => {
  try {
    const uid = req.user!.uid;
    const { modelType, prediction } = req.body;

    if (!modelType || !prediction) {
      res.status(400).json({ error: "Invalid request body" });
      return;
    }

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
});


// Get all records of given user
router.get('/', async (req: AuthRequest, res: Response) => {
  try {
    // Extract uid from AuthRequest😈
    const uid = req.user!.uid;
    
    // Pagination - send data in chunks, not altogether
    const limit = 10;
    const page  = Number(req.query.page) || 1;
    const skip  = (page - 1) * limit;

    // Fetch userHistory by userId (returns array, sort by creation date)
    const userHistory = await History.find({ userId: uid })
        .sort({ createdAt: -1 })
        .limit(limit)
        .skip(skip);

    res.status(200).json(userHistory); // empty arr if no history
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch records" });
  }
});


export default router;