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

export default BookingRouter;
