import express from 'express';
const router = express.Router();
import {signin, signup} from '../contollers/authController.js';

router.post('/register', signup)
router.post('/login', signin)

export default router;