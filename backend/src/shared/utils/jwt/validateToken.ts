// libraries
import jwt from 'jsonwebtoken';
import AppError from '../error/errorConstructor';

// SSOT
import { errorMessages, httpStatus } from '../../../SSOT/exporter';

// Environment variables
const JWT_SECRET: string = process.env.JWT_SECRET || 'default';

export default function validateToken(token: string): void {
  try {
    jwt.verify(token, JWT_SECRET);
  } catch (__e) {
    throw new AppError(errorMessages.USER_NOT_AUTHENTICATED, httpStatus.HttpStatusUnauthorized);
  }
}
