import express from 'express';
import { isAuthenticated, RegisterUser, resetPassword, sendOtp, sendResetOtp, userLogin, userLogout, verifyEmail } from '../controllers/auth.controller.js';
import userAuth from '../middleware/auth.middleware.js';

const authRouter = express.Router();

authRouter.post('/register',RegisterUser);
authRouter.post('/login',userLogin);
authRouter.post('/logout',userLogout);
authRouter.post('/send-verify-otp',userAuth,sendOtp);
authRouter.post('/verify-mail',userAuth,verifyEmail);
authRouter.get('/is-auth',userAuth,isAuthenticated);
authRouter.post('/send-reset-otp',sendResetOtp);
authRouter.post('/reset-password',resetPassword);

export default authRouter;

