import { StatusCodes } from 'http-status-codes';
import { pool } from '../../config/db';
import AppError from '../../error/AppError';
import { UserConstants } from '../user/user.constant';
import { TUser } from '../user/user.interface';
import VehicleConstants from '../vehicles/vehicle.constant';
import { BookingConstants } from './booking.constant';
import { TBooking } from './booking.interface';

const createBooking = async (payload: Partial<TBooking>, user: TUser) => {
    const { customer_id, vehicle_id, rent_end_date, rent_start_date } = payload;
    if (!customer_id) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'customer id required');
    }
    if (!vehicle_id) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'vehicle id required');
    }
    // checking the identity
    if (customer_id !== user?.id && user?.role !== UserConstants.Roles.admin) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Please signin to your account!');
    }
    const vehicle = await pool.query(
        `SELECT vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id=$1`,
        [vehicle_id]
    );
    if (!vehicle?.rowCount) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'vehicle not found!');
    }
    // check if already booked or not
    if (vehicle?.rows[0]?.availability_status === VehicleConstants.availabilityStatus.booked) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Car is not available');
    }

    if (new Date(rent_end_date) < new Date(rent_start_date)) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Invalid start or end date');
    }

    const differenceIntoMs =
        new Date(rent_end_date).getTime() - new Date(rent_start_date).getTime();

    const days = Math.ceil(differenceIntoMs / (1000 * 60 * 60 * 24));

    const calculateTotalCost = vehicle?.rows[0]?.daily_rent_price * days;

    // update vehicle
    await pool.query(`UPDATE vehicles SET availability_status=$1 WHERE id=$2`, [
        VehicleConstants.availabilityStatus.booked,
        vehicle_id,
    ]);

    const booking = await pool.query(
        `INSERT INTO bookings (customer_id, vehicle_id, rent_start_date, rent_end_date, total_price, status) VALUES ($1, $2, $3, $4, $5, $6) RETURNING * `,
        [
            customer_id,
            vehicle_id,
            rent_start_date,
            rent_end_date,
            calculateTotalCost,
            BookingConstants.BookingStatus.active,
        ]
    );
    const modifiedObj = {
        ...booking?.rows[0],
        vehicle: {
            vehicle_name: vehicle?.rows[0]?.vehicle_name,
            daily_rent_price: vehicle?.rows[0]?.daily_rent_price,
        },
    };
    return modifiedObj;
};

const getBookings = async (user: TUser) => {
    if (user?.role === UserConstants.Roles.admin) {
        const bookings = await pool.query(`SELECT *  FROM bookings`);
        return bookings?.rows;
    } else {
        const booking = await pool?.query(`SELECT * FROM bookings WHERE customer_id=$1`, [
            user?.id,
        ]);
        if (!booking?.rowCount) {
            throw new AppError(StatusCodes.NOT_FOUND, "You haven't booked a car!");
        }
        return booking?.rows[0];
    }
};

const updateBooking = async (bookingId: string, user: TUser) => {
    const booking = await pool?.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId]);

    if (!booking?.rowCount) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Booking not found!');
    }

    if (booking?.rows[0]?.customer_id !== user?.id && user.role !== UserConstants.Roles.admin) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Please signin to your account!');
    }

    if (new Date(booking?.rows[0]?.rent_start_date) > new Date()) {
        throw new AppError(StatusCodes.BAD_REQUEST, "You can't cancel booking until it starts!");
    }

    const updatedBooking = await pool?.query(
        `UPDATE bookings SET status=$1 WHERE id=$2 RETURNING *`,
        [BookingConstants.BookingStatus.returned, bookingId]
    );

    const updatedVehicle = await pool?.query(
        `UPDATE vehicles SET availability_status=$1 WHERE id=$2 RETURNING availability_status`,
        [VehicleConstants.availabilityStatus.available, booking?.rows[0]?.vehicle_id]
    );

    return {
        ...updatedBooking?.rows[0],
        vehicle: {
            availability_status: updatedVehicle?.rows[0]?.availability_status,
        },
    };
};

const BookingServices = {
    createBooking,
    getBookings,
    updateBooking,
};

export default BookingServices;
