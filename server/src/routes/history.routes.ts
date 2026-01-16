/*
  routes/history.ts
  - creates all endpoints related to history entity (db table)
  - this includes get, post, update, del, etc.
  - export this router to mount it on top of main server
*/
import { Router } from 'express';
import authMiddleware from '../middlewares/auth';
import { addRecord, deleteRecord, getHistory } from '../controllers/history.controller';

// A mini express app - lets u handle routes
const router = Router();

// All endpoints below go through middleware
router.use(authMiddleware);

// Insert record in DB
router.post('/', addRecord);

// Get all records of given user
router.get('/', getHistory);

// Delete recs
router.delete('/:doc_id', deleteRecord);

export default router;