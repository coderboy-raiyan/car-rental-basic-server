import { pool } from '../../config/db';
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

const UserServices = {
    getAllUsers,
    updateUser,
};

export default UserServices;
