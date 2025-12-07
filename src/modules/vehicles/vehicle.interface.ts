import VehicleConstants from './vehicle.constant';

export type TAvailabilityStatus = keyof typeof VehicleConstants.availabilityStatus;
export type TVehicleType = keyof typeof VehicleConstants.vehicleType;

export type TVehicle = {
    id: number;
    vehicle_name: string;
    type: TVehicleType;
    registration_number: string;
    daily_rent_price: number;
    availability_status: TAvailabilityStatus;
};
