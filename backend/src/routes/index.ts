import express, { Request, Response } from "express";

const router = express.Router();

// Root endpoint
router.get("/", (_req: Request, res: Response) => {
  res.send("Node.js Server is running!");
});

export default router
