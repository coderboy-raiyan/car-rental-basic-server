const BookingStatus = {
    active: 'active',
    cancelled: 'cancelled',
    returned: 'returned',
} as const;

export const BookingConstants = {
    BookingStatus,
};
