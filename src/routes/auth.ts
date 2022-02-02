import { Router } from 'express';
import { createUser, getProfile, login } from '@controllers/auth';

const router = Router();

router.post('/createUser', createUser);
router.post('/getProfile', getProfile);
router.post('/login', login);

export default router;
