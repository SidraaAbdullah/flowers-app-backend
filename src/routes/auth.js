import express from "express";
// import { auth } from "../middlewares";
import {
  register,
  login,
  verifyUser,
  // currentUser,
  // forgotPassword,
  // profileUpdate,
} from "../controllers";

const router = express.Router();

// router.get("/current-user", auth, currentUser);
router.post("/register", register);
router.post("/login", login);
router.post("/verify-user", verifyUser);

// router.post("/forgot-password", forgotPassword);
// router.put("/profile-update", auth, profileUpdate);

export default router;
