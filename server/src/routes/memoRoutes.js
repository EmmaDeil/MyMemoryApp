import express from 'express';
const router = express.Router();
import {createpost, updatepost, deletepost, likepost, getAllPosts, getOnePost} from '../contollers/memoController.js';
import authMiddleware from '../middlewares/authMiddleWare.js';
import upload from '../middlewares/upload.js';

// GET routes
router.get('/', getAllPosts);           // GET /api/posts
router.get('/:id', getOnePost);         // GET /api/posts/:id

// POST routes  
router.post('/', authMiddleware, upload.single('selectedFile'), createpost);     // POST /api/posts

// PUT routes
router.put('/:id', authMiddleware, upload.single('selectedFile'), updatepost);   // PUT /api/posts/:id
router.patch('/:id/like', authMiddleware, likepost); // PATCH /api/posts/:id/like

// DELETE routes
router.delete('/:id', authMiddleware, deletepost); // DELETE /api/posts/:id

export default router;