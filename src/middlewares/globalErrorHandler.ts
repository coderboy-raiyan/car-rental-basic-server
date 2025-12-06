/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import config from '../config';

function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: 'Something went wrong!!',
        err: config?.NODE_ENV !== 'production' && err,
    });
}

export default globalErrorHandler;
