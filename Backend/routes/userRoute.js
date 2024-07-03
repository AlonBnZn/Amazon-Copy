import express from "express";
import {
  createUser,
  loginUser,
  authenticateToken,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/signup", createUser, authenticateToken);

router.post("/signin", loginUser, authenticateToken);

export default router;
