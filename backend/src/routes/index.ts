import express, { Request, Response } from "express";

import registerRoutes from './register';
import devicesRoutes from './devices';

const router = express.Router();

// Root endpoint
router.get("/", (_req: Request, res: Response) => {
  res.send("Node.js Server is running!");
});

router.use("/register", registerRoutes);
router.use("/devices", devicesRoutes);

export default router
