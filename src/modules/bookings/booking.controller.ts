import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import CatchAsyncError from '../../utils/catchAsyncError';
import sendResponse from '../../utils/sendResponse';
import { TUser } from '../user/user.interface';
import BookingServices from './booking.service';

const createBooking = CatchAsyncError(async (req: Request, res: Response) => {
    const data = await BookingServices.createBooking(req?.body, req?.user as TUser);
    return sendResponse(res, {
        statusCode: StatusCodes.CREATED,
        success: true,
        message: 'Booking created successfully',
        data,
    });
});

const BookingControllers = {
    createBooking,
};

export default BookingControllers;
