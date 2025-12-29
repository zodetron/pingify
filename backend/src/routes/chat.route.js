import express from "express";
import { generateStreamToken } from "../lib/stream.js";
import { getStreamToken } from "../controllers/chat.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/token", protectRoute, getStreamToken)

export default router;
