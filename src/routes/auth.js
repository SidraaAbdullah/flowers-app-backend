import express from 'express';
import { register, login, verifyUser, changePassword } from '../controllers';
import { auth } from '../middlewares';
import { validate } from '../middlewares/schemaValidate';
import { validateChangePassword } from '../validations/user';

const router = express.Router();

// router.get("/current-user", auth, currentUser);
router.post('/register', register);
router.post('/login', login);
router.post('/verify-user', verifyUser);
router.put('/change-password', [auth, validate(validateChangePassword)], changePassword);

// router.post("/forgot-password", forgotPassword);
// router.put("/profile-update", auth, profileUpdate);

export default router;
