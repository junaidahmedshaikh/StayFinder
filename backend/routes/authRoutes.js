import express from "express";
import { register, login, becomeHost } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/become-host", becomeHost);

export default router;
