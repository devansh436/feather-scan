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
import connectDB from "./config/db";
import historyRoutes from './routes/history.routes';
import uploadRoutes from './routes/upload.routes';
import healthRoutes from './routes/health.routes';
import env  from './config/env';

connectDB();

// Create express app
const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/history', historyRoutes);
app.use('/upload', uploadRoutes);
app.use('/health', healthRoutes);

// test route
app.get("/test", (req: Request, res: Response) => {
  res.status(200).send("OK");
});

// LISTEN
const PORT = Number(env.PORT) || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
