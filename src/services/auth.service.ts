import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/user.model.js';
import { ProfileModel } from '../models/profile.model.js';
import { env } from '../config/env.js';
import { ApiError } from '../utils/apiError.js';
import { JwtPayload } from '../types/index.js';

export class AuthService {
  static async register(data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    role?: 'EMPLOYEE' | 'MANAGER' | 'ADMIN';
  }) {
    const existing = await UserModel.findByEmail(data.email);
    if (existing) {
      throw ApiError.conflict('An account with this email already exists');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const userId = crypto.randomUUID();

    await UserModel.create({
      id: userId,
      email: data.email,
      password: hashedPassword,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role || 'EMPLOYEE',
    });

    // Create empty profile
    await ProfileModel.create({
      id: crypto.randomUUID(),
      userId,
    });

    const user = {
      id: userId,
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: data.role || 'EMPLOYEE',
    };

    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    return { user, token };
  }

  static async login(credentials: { email: string; password: string }) {
    const user = await UserModel.findByEmail(credentials.email);

    if (!user) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    if (!user.isActive) {
      throw ApiError.forbidden('User account is deactivated');
    }

    const isMatch = await bcrypt.compare(credentials.password, user.password);
    if (!isMatch) {
      throw ApiError.unauthorized('Invalid email or password');
    }

    const token = this.generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    const { password: _, ...userWithoutPassword } = user;

    return { user: userWithoutPassword, token };
  }

  static generateToken(payload: JwtPayload): string {
    return jwt.sign(payload, env.JWT_SECRET, {
      expiresIn: env.JWT_EXPIRES_IN as jwt.SignOptions['expiresIn'],
    });
  }
}
