import { Router } from 'express';
import { createUser, getProfile } from '@controllers/auth';

const router = Router();

router.post('/createUser', createUser);
router.post('/getProfile', getProfile);

export default router;
