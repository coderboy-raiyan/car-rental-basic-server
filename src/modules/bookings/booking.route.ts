import { Router } from 'express';
import verifyAuth from '../../middlewares/verifyAuth';
import { UserConstants } from '../user/user.constant';
import BookingControllers from './booking.controller';

const BookingRouter = Router();

BookingRouter.post(
    '/',
    verifyAuth(UserConstants.Roles.admin, UserConstants.Roles.customer),
    BookingControllers.createBooking
);

BookingRouter.get(
    '/',
    verifyAuth(UserConstants.Roles.admin, UserConstants.Roles.customer),
    BookingControllers.getBookings
);
BookingRouter.put(
    '/:bookingId',
    verifyAuth(UserConstants.Roles.admin, UserConstants.Roles.customer),
    BookingControllers.updateBooking
);

export default BookingRouter;
