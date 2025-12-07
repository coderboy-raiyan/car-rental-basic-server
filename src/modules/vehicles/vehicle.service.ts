import { StatusCodes } from 'http-status-codes';
import { pool } from '../../config/db';
import AppError from '../../error/AppError';
import { UpdateQueryBuilder } from '../../utils/QueryBuilder';
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

const updateVehicle = async (id: string, payload: Partial<TVehicle>) => {
    const vehicle = await pool.query(`SELECT id from vehicles WHERE id=$1`, [id]);

    if (!vehicle?.rowCount) {
        throw new AppError(StatusCodes.NOT_FOUND, 'Vehicle not found!');
    }

    const { fields, values, variableCount } = UpdateQueryBuilder(payload, [
        'vehicle_name',
        'type',
        'registration_number',
        'daily_rent_price',
        'availability_status',
    ]);
    values.push(id);
    const query = `
        UPDATE vehicles SET ${fields.join(', ')} WHERE id=$${variableCount} RETURNING *
        `;

    const result = await pool.query(query, values);
    return result?.rows[0];
};

const VehicleServices = {
    createVehicle,
    getAllVehicles,
    getSingleVehicle,
    updateVehicle,
};

export default VehicleServices;
