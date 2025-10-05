import express from 'express'
import { getUserProfile, login, logout, register } from '../controller/auth.controller.js';
import { userAuthenticaiton } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);
router.get('/profile', userAuthenticaiton, getUserProfile);

export default router;