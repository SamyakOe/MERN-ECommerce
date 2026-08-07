import express from 'express';
import {registerUser, signInUser, refreshTokenCookie} from '../controllers/authController.js';

const router = express.Router();

//Register New Users
router.post('/register', registerUser);

//User Sign In
router.post('/signin', signInUser);

//Refresh Token
router.post('/refresh',refreshTokenCookie)

export default router;