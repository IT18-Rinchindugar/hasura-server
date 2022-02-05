import { Request, Response } from 'express';
import statusCode from 'http-status';
import asyncHandler from 'express-async-handler';
import firebase, { auth } from 'firebase-admin';
import fetch from 'node-fetch';
import path from 'path';
import config from '@lib/config';

const { GOOGLE_FIREBASE_CONFIG, GOOGLE_FIREBASE_WEB_API_KEY } = config;
const AUTH_URL = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${GOOGLE_FIREBASE_WEB_API_KEY}`;
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

// @desc      Get user profile
// @route     POST /api/v1/auth/login
// @access    Public

const login = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const { email, password } = req.body.input.credentials;
  const loginRequest = await fetch(AUTH_URL, {
    method: 'POST',
    body: JSON.stringify({
      email,
      password,
      returnSecureToken: true,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const { idToken, localId } = await loginRequest.json();

  if (!idToken) throw Error('No idToken');
  return res.status(200).send({
    accessToken: idToken,
    id: localId,
  });
});

// @desc      Auth Hook permission
// @route     GET /api/v1/auth/authHook
// @access    Public

const authHook = asyncHandler(async (req: Request, res: Response): Promise<any> => {
  const customAuthHeader = req.headers['secret-header'];
  if (!customAuthHeader || customAuthHeader !== 'trust-me') { throw Error('No header or invalid'); }

  return res.status(200).send({
    'x-hasura-role': 'user',
  });
});

export {
  createUser, getProfile, login, authHook,
};
