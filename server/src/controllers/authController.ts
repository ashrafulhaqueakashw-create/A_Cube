import { Request, Response, NextFunction } from 'express';
import User from '../models/User.js';
import { AppError } from '../middleware/errorHandler.js';
import { generateAccessToken, generateRefreshToken } from '../utils/jwt.js';
import { generateResetToken } from '../utils/helpers.js';
import { env } from '../config/env.js';
import crypto from 'crypto';

const setCookies = (res: Response, accessToken: string, refreshToken: string) => {
  const isProd = env.NODE_ENV === 'production';
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 15 * 60 * 1000 // 15 mins
  });
  res.cookie('refreshToken', refreshToken, {
    httpOnly: true,
    secure: isProd,
    sameSite: isProd ? 'none' : 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
  });
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, phone, password, hscBatch, group } = req.body;
    
    const userExists = await User.findOne({ email });
    if (userExists) return next(new AppError('User already exists', 400));

    const user = await User.create({
      name, email, phone, password, hscBatch, group, role: 'student', status: 'pending'
    });

    res.status(201).json({ success: true, message: 'Registration successful. Waiting for admin approval.' });
  } catch (error) { next(error); }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await (user as any).matchPassword(password))) {
      return next(new AppError('Invalid credentials', 401));
    }
    
    if (user.status === 'suspended') return next(new AppError('Account suspended', 403));
    if (user.role === 'student' && user.status === 'pending') return next(new AppError('Account pending approval', 403));

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role });
    
    user.refreshToken = refreshToken;
    await user.save();

    setCookies(res, accessToken, refreshToken);
    
    const userObj = user.toObject() as Record<string, any>;
    delete userObj.password;
    delete userObj.refreshToken;
    
    res.json({ success: true, user: userObj, data: userObj });
  } catch (error) { next(error); }
};

export const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, role: 'admin' }).select('+password');
    if (!user || !(await (user as any).matchPassword(password))) {
      return next(new AppError('Invalid admin credentials', 401));
    }
    
    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    const refreshToken = generateRefreshToken({ id: user._id, role: user.role });
    
    user.refreshToken = refreshToken;
    await user.save();

    setCookies(res, accessToken, refreshToken);
    
    const adminObj = {
      _id: user._id,
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    };
    
    res.json({ success: true, user: adminObj, data: adminObj });
  } catch (error) { next(error); }
};

export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.refreshToken;
    if (token) {
      await User.findOneAndUpdate({ refreshToken: token }, { refreshToken: null });
    }
    const isProd = env.NODE_ENV === 'production';
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax'
    });
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: isProd,
      sameSite: isProd ? 'none' : 'lax'
    });
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (error) { next(error); }
};

export const refreshToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const rfToken = req.cookies.refreshToken;
    if (!rfToken) return next(new AppError('No refresh token', 401));
    
    const user = await User.findOne({ refreshToken: rfToken });
    if (!user) return next(new AppError('Invalid refresh token', 401));

    const accessToken = generateAccessToken({ id: user._id, role: user.role });
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });
    
    res.json({ success: true });
  } catch (error) { next(error); }
};

export const forgotPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return next(new AppError('No user found', 404));

    const { resetToken, hashedToken, expiresAt } = generateResetToken();
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = new Date(expiresAt);
    await user.save();

    res.json({ success: true, message: 'Token generated', resetToken });
  } catch (error) { next(error); }
};

export const resetPassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) return next(new AppError('Invalid or expired token', 400));

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ success: true, message: 'Password updated' });
  } catch (error) { next(error); }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = (req as any).user;
    res.json({ success: true, user, data: user });
  } catch (error) { next(error); }
};
