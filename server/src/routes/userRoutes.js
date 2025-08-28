import express from 'express';
const router = express.Router();
import {signin, signup, getProfile, updateProfile} from '../contollers/authController.js';
import authMiddleware from '../middlewares/authMiddleWare.js';

// Authentication routes
router.post('/register', signup);       // POST /api/users/register
router.post('/login', signin);          // POST /api/users/login

// Profile routes (protected)
router.get('/profile', authMiddleware, getProfile);      // GET /api/users/profile
router.put('/profile', authMiddleware, updateProfile);   // PUT /api/users/profile

export default router;