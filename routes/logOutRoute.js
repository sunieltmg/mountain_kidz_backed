import { Router } from 'express';
import handleLogOut from '../controllers/logOutController.js';
import mongoose from 'mongoose';

const router = Router();

router.route('/').get(handleLogOut);

export default router;
