import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getMyFriends, getRecommendedUsers } from "../controllers/user.controller.js";



const router = express.Router();
// apply auth middleware to all rather than writing the protectRoute everywhere
router.use(protectRoute);
// router.get("/", protectRoute,getRecommendedUsers);


router.get("/",getRecommendedUsers);
router.get("/friends",getMyFriends);

router.get("/friend-request/:id", sendFriendRequest);

export default router;