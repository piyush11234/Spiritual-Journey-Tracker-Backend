import express from 'express'
import { changePassword, forgotPassword, loginUser, logoutUser, registerUser, sendContactMessage, updateProfile, verification, verifyOTP } from '../controllers/userController.js';
import { isAuthenticated } from '../middleware/isAuthenticated.js';
import { registerValidator } from '../middleware/registerValidator.js';
import { validateErrors } from '../middleware/validateErrors.js';
import { singleUpload } from '../middleware/multer.js';


const router=express.Router();

router.post('/register',registerValidator,validateErrors, registerUser);
router.post('/verify',verification);
router.post('/login',loginUser);
router.post('/logout',isAuthenticated, logoutUser);
router.post('/forgot-password',forgotPassword);
router.post('/verify-otp/:email',verifyOTP);
router.post('/change-password/:email',changePassword);

router.post("/contact", sendContactMessage);

router.put('/profile/update',isAuthenticated,singleUpload, updateProfile);

export default router;