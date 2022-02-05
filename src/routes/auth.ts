import { Router } from 'express';
import {
  authHook, createUser, getProfile, login,
} from '@controllers/auth';

const router = Router();

router.post('/createUser', createUser);
router.post('/getProfile', getProfile);
router.post('/login', login);
router.get('/authHook', authHook);

export default router;
