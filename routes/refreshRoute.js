import { Router } from 'express';
import handleRefreshToken from '../controllers/refreshTokenController.js';
const router = Router();


router.route('/').get(handleRefreshToken);

export default router;