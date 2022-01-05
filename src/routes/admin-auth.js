import express from "express";
// import { auth } from "../middlewares";
import {
  AdminLogin,
  AdminRegister,
  // currentUser,
  // forgotPassword,
  // profileUpdate,
} from "../controllers";

const router = express.Router();

// router.get("/current-user", auth, currentUser);
router.post("/admin-register", AdminRegister);
router.post("/admin-login", AdminLogin);
// router.post("/forgot-password", forgotPassword);
// router.put("/profile-update", auth, profileUpdate);

export default router;
