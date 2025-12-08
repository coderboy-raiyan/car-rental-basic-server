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
const updateBooking = CatchAsyncError(async (req: Request, res: Response) => {
    const data = await BookingServices.updateBooking(req?.params?.bookingId, req?.user as TUser);
    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Booking marked as returned. Vehicle is now available',
        data,
    });
});
const getBookings = CatchAsyncError(async (req: Request, res: Response) => {
    const data = await BookingServices.getBookings(req?.user as TUser);
    return sendResponse(res, {
        statusCode: StatusCodes.OK,
        success: true,
        message: 'Bookings retrieved successfully',
        data,
    });
});

const BookingControllers = {
    createBooking,
    getBookings,
    updateBooking,
};

export default BookingControllers;
