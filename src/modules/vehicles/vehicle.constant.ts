const availabilityStatus = {
    available: 'available',
    booked: 'booked',
} as const;

const vehicleType = {
    car: 'car',
    bike: 'bike',
    van: 'van',
    SUV: 'SUV',
} as const;

const VehicleConstants = {
    availabilityStatus,
    vehicleType,
};

export default VehicleConstants;
