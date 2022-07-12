import { Router } from 'express';
import {
  getAllCourses,
  createNewCourse,
  updateCourse,
  deleteCourse,
  getSingleCourse,
  deleteSingleCourse,
} from '../../controllers/courseController.js';
const router = Router();

router.route('/').get(getAllCourses).post(createNewCourse).delete(deleteCourse);

router
  .route('/:id')
  .get(getSingleCourse)
  .put(updateCourse)
  .delete(deleteSingleCourse);

export default router;
