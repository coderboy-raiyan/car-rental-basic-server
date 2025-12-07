import { pool } from '../../config/db';
import { TVehicle } from './vehicle.interface';

const createVehicle = async ({
    vehicle_name,
    type,
    registration_number,
    daily_rent_price,
    availability_status,
}: TVehicle) => {
    const vehicle = await pool.query(
        `
        INSERT INTO vehicles (vehicle_name, type, registration_number, daily_rent_price, availability_status) VALUES ($1, $2, $3, $4, $5) RETURNING *
    `,
        [vehicle_name, type, registration_number, daily_rent_price, availability_status]
    );

    return vehicle?.rows[0];
};

const getAllVehicles = async () => {
    const vehicle = await pool.query(
        `
            SELECT * FROM vehicles 
        `
    );

    return vehicle;
};
const getSingleVehicle = async (id: string) => {
    const vehicle = await pool.query(
        `
            SELECT * FROM vehicles WHERE id=$1
        `,
        [id]
    );

    return vehicle;
};

const VehicleServices = {
    createVehicle,
    getAllVehicles,
    getSingleVehicle,
};

export default VehicleServices;
