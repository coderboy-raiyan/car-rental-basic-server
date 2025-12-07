import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { JwtPayload, verify } from 'jsonwebtoken';
import config from '../config';
import AppError from '../error/AppError';
import { TRoles } from '../modules/user/user.interface';

function verifyAuth(...role: TRoles[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        try {
            const headers = (req?.headers?.authorization || req?.headers?.Authorization) as string;

            const token = headers?.split('Bearer ')[1];
            if (!token) {
                throw new AppError(StatusCodes.FORBIDDEN, 'Invalid access token!');
            }
            const decoded = verify(token, config.JWT_SECRET) as JwtPayload;
            if (!role.includes(decoded?.role)) {
                throw new AppError(StatusCodes.UNAUTHORIZED, 'Not allowed');
            }
            req.user = decoded;
            next();
        } catch (error) {
            next(error);
        }
    };
}

export default verifyAuth;
