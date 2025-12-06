/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import AppError from '../error/AppError';

function globalErrorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    let statusCode = StatusCodes.INTERNAL_SERVER_ERROR;
    let message = 'Something went wrong!';
    let errors = [];
    if (err instanceof AppError) {
        statusCode = err?.statusCode;
        message = err?.message;
        errors = [
            {
                path: '',
                message: err?.message,
            },
        ];
    }
    return res.status(statusCode).json({
        success: false,
        message,
        errors,
    });
}

export default globalErrorHandler;
