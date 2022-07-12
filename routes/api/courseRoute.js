import { Router } from 'express';
import {
  getAllCourses,
  createNewCourse,
  updateCourse,
  deleteCourse,
  getSingleCourse,
} from '../../controllers/courseController.js';
const router = Router();

router
  .route('/')
  .get(getAllCourses)
  .post(createNewCourse)
  .put(updateCourse)
  .delete(deleteCourse);

router.route('/:id').get(getSingleCourse);

export default router;
