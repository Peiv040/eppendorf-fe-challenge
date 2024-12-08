import express, { Request, Response } from "express";

import registerRoutes from './register';

const router = express.Router();

// Root endpoint
router.get("/", (_req: Request, res: Response) => {
  res.send("Node.js Server is running!");
});

router.use("/register", registerRoutes);

export default router
