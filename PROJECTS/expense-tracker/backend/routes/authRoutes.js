import express, { Router } from "express";

import { LOGIN, REGISTER } from "../controllers/authController.js";

const router = Router();

router.post("/register", REGISTER);
router.post("/login", LOGIN);

export default router;
