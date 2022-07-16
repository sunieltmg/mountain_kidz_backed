import { Router } from 'express';
import {
  getAllCourses,
  createNewCourse,
  updateCourse,
  deleteCourse,
  getSingleCourse,
  deleteSingleCourse,
} from '../../controllers/courseController.js';

import cacheAllCourse from '../../middleware/redisCache.js';
const router = Router();

// creating swagger models

/**
 * @openapi
 * components:
 *  schemas:
 *   Course:
 *    type:Object
 *    required:
 *     - title
 *     - description
 *     - image
 *    properties:
 *     title:
 *      type:String
 *      description:"Title of the course"
 *     description:
 *      type:String
 *      description:"Descrition of the course"
 *     image:
 *      type:String
 *      description:"Image of the course"
 *    example:
 *     title:"English"
 *     description:"English is the internationally spoken language"
 *     image:"course image url"
 *
 *
 *
 */

router
  .route('/')
  .get(cacheAllCourse, getAllCourses)
  .post(createNewCourse)
  .delete(deleteCourse);

router
  .route('/:id')
  .get(getSingleCourse)
  .put(updateCourse)
  .delete(deleteSingleCourse);

export default router;
