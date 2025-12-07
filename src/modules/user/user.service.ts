import { StatusCodes } from 'http-status-codes';
import { pool } from '../../config/db';
import AppError from '../../error/AppError';
import { UpdateQueryBuilder } from '../../utils/QueryBuilder';
import { TUser } from './user.interface';

const getAllUsers = async () => {
    const result = await pool.query(
        `
                SELECT id,name,email,role,phone FROM users 
            `
    );

    return result;
};

const updateUser = async (id: string | number, payload: Partial<TUser>) => {
    if (!Object.keys(payload)?.length) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Please provide data');
    }
    const { query, values } = UpdateQueryBuilder('users', id, payload, [
        'name',
        'email',
        'phone',
        'role',
    ]);

    const result = await pool.query(query, values);
    const updatedUser = { ...result?.rows[0] };

    delete updatedUser?.password;
    delete updatedUser?.id;

    return updatedUser;
};

const deleteUser = async (id: string | number) => {
    const deletedUser = await pool.query(`DELETE FROM users WHERE id=$1 RETURNING name,email`, [
        id,
    ]);
    return deletedUser;
};

const UserServices = {
    getAllUsers,
    updateUser,
    deleteUser,
};

export default UserServices;
