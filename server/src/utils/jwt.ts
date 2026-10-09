import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { Types } from 'mongoose';

type TokenPayload = { id: string | Types.ObjectId; role: string };

export const generateAccessToken = (payload: TokenPayload) => {
  return jwt.sign({ id: payload.id.toString(), role: payload.role }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRY as jwt.SignOptions['expiresIn'],
  });
};

export const generateRefreshToken = (payload: TokenPayload) => {
  return jwt.sign({ id: payload.id.toString(), role: payload.role }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRY as jwt.SignOptions['expiresIn'],
  });
};

export const verifyAccessToken = (token: string) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET) as TokenPayload;
};

export const verifyRefreshToken = (token: string) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET) as TokenPayload;
};
