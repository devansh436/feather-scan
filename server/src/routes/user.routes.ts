import { Router } from 'express';
import { getUserRecord } from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.use(authMiddleware);

router.get('/', getUserRecord);

export default router;