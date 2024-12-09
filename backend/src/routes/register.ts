import express, { Request, Response } from "express";
import bcrypt from "bcrypt";
import { validateRegistration } from "../validators/validator";

const router = express.Router();

router.post("/", async (req: any, res: any, next) => {
  try {
    const { name, email, password } = req.body;

    const errors = validateRegistration({ name, email, password });
    if (Object.keys(errors).length > 0) {
      return res.status(400).json({ errors });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = { id: Date.now(), name, email, password: hashedPassword };

    res.status(201).json({ message: "User registered successfully!", user: newUser });
  } catch (err) {
    next(err);
  }
});

export default router
