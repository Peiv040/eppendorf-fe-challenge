import express, { Request, Response } from "express";
import path from "path";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.sendFile(path.resolve(__dirname, "../json/data.json"));
});

export default router
