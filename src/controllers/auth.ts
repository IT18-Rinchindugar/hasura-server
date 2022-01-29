import { Request, Response } from 'express';
import statusCode from 'http-status';
import asyncHandler from 'express-async-handler';
import * as dotenv from 'dotenv';
import firebase, { auth } from 'firebase-admin';
import path from 'path';

dotenv.config();
const { GOOGLE_FIREBASE_CONFIG } = process.env;

const keyFilename = path.join(__dirname, `../config/${GOOGLE_FIREBASE_CONFIG}`);

firebase.initializeApp({
  credential: firebase.credential.cert(keyFilename),
});

// @desc      Register user
// @route     POST /api/v1/auth/register
// @access    Public

const createUser = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { email, password, displayName } = req.body.input.credentials;
  const user = await auth().createUser({
    email,
    password,
    displayName,
  });
  await auth().setCustomUserClaims(user.uid, {
    'https://hasura.io/jwt/claims': {
      'x-hasura-allowed-roles': ['user'],
      'x-hasura-default-role': 'user',
      'x-hasura-user-id': user.uid,
    },
  });
  return res.status(statusCode.OK).send({
    id: user.uid,
    email: user.email,
    displayName: user.displayName,
  });
});

// @desc      Get user profile
// @route     POST /api/v1/auth/getProfile
// @access    Private

const getProfile = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { id } = req.body.input;
  const { uid, email, displayName } = await auth().getUser(id);
  return res.status(statusCode.OK).send({
    id: uid,
    email,
    displayName,
  });
});

export { createUser, getProfile };
