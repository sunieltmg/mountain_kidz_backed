import { Router } from 'express';
import { deleteAllUser } from '../../controllers/userController.js';
const router = Router();

router.route('/delete').delete(deleteAllUser);

export default router;
