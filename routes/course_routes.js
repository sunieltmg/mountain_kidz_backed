import { Router } from 'express';
import { postCourse } from '../controllers/course_controller.js';

const router = Router();

router.route('/').get().post().put().delete();

export default router;
