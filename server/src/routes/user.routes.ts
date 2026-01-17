import { Router } from 'express';
import { getUserRecords } from '../controllers/user.controller';
import authMiddleware from '../middlewares/auth';

const router = Router();

router.use(authMiddleware);

router.get('/', getUserRecords);

export default router;