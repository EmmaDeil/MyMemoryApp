import express from 'express';
const router = express.Router();
import {createpost, updatepost, deletepost, likepost, getAllPosts, getOnePost} from '../contollers/memoController.js';
import authMiddleware from '../middlewares/authMiddleWare.js';

router.post('/createpost', createpost)
router.get('/getone', getOnePost)
router.get('/getall', getAllPosts)
router.put('/:id', authMiddleware, updatepost)
router.delete('/:id', authMiddleware, deletepost)
router.put('/:id', likepost)

export default router;