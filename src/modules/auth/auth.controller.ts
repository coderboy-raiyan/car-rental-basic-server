import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CatchAsyncError from '../../utils/catchAsyncError';
import sendResponse from '../../utils/sendResponse';
import AuthServices from './auth.service';

const signUp = CatchAsyncError(async (req: Request, res: Response) => {
    const data = await AuthServices.signUp(req.body);
    return sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'User registered successfully',
        data,
    });
});
const signIn = CatchAsyncError(async (req: Request, res: Response) => {
    const data = await AuthServices.signIn(req.body);

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Login successful',
        data,
    });
});

const AuthControllers = {
    signUp,
    signIn,
};

export default AuthControllers;
