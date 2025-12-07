import { BookingConstants } from './booking.constant';

export type TBookingStatus = keyof typeof BookingConstants.BookingStatus;

export type TBooking = {
    id: number;
    customer_id: number | string;
    vehicle_id: number | string;
    rent_start_date: string; // Date object or ISO string
    rent_end_date: string;
    total_price: number;
    status: TBookingStatus;
};
