import { Router } from 'express';
import authMiddleware from "../middlewares/auth";
import { uploadImage } from "../controllers/upload.controller"
import multer, { memoryStorage } from "multer";

const router = Router();
const upload = multer({ storage: memoryStorage() });

router.use(authMiddleware)

router.post('/', upload.single("image"), uploadImage);

export default router;