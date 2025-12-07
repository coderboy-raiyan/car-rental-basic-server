import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { pool } from '../../config/db';
import AppError from '../../error/AppError';
import { UserConstants } from './user.constant';

async function verifyIdentity(req: Request, res: Response, next: NextFunction) {
    try {
        if (req?.user?.role === UserConstants.Roles.admin) {
            return next();
        }
        const updateProfile = await pool.query(
            `
            SELECT email FROM users WHERE id=$1
        `,
            [req?.params?.userId]
        );

        if (updateProfile?.rows[0]?.email !== req?.user?.email) {
            throw new AppError(StatusCodes.FORBIDDEN, 'Please sign in to your account');
        }

        const copyBody = { ...req?.body };
        delete copyBody?.role;
        req.body = copyBody;
        next();
    } catch (error) {
        next(error);
    }
}

const UserMiddleWares = {
    verifyIdentity,
};

export default UserMiddleWares;
