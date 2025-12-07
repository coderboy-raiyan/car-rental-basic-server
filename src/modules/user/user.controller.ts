import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CatchAsyncError from '../../utils/catchAsyncError';
import sendResponse from '../../utils/sendResponse';
import UserServices from './user.service';

const getUsers = CatchAsyncError(async (req: Request, res: Response) => {
    const data = await UserServices.getAllUsers();
    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: data?.rowCount ? 'Users retrieved successfully' : 'Users not found',
        data: data?.rows,
    });
});
const updateUser = CatchAsyncError(async (req: Request, res: Response) => {
    const data = await UserServices.updateUser(req?.params?.userId, req?.body);

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User updated successfully',
        data,
    });
});
const deleteUser = CatchAsyncError(async (req: Request, res: Response) => {
    await UserServices.deleteUser(req?.params?.userId);

    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'User deleted successfully',
    });
});

const UserControllers = {
    getUsers,
    updateUser,
    deleteUser,
};

export default UserControllers;
