import express from "express";
import { registerUser, getUsers } from "../controllers/users.js";

const router = express.Router();

// Register a new user
router.post("/register", registerUser);

// Get all users
router.get("/", getUsers);

export default router;
