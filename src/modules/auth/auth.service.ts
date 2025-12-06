/* eslint-disable @typescript-eslint/no-explicit-any */
import { compare, hash } from 'bcryptjs';
import { StatusCodes } from 'http-status-codes';
import { sign } from 'jsonwebtoken';
import config from '../../config';
import { pool } from '../../config/db';
import AppError from '../../error/AppError';
import { TUser } from '../user/user.interface';

const signUp = async ({ name, email, password, phone, role }: TUser) => {
    const hashedPass = await hash(password, 12);
    const data = await pool.query(
        `
            INSERT INTO users(email, password, phone, role, name) VALUES ($1, $2, $3, $4, $5) RETURNING name, email, phone, role
        `,
        [email, hashedPass, phone, role, name]
    );
    return data?.rows[0];
};

const signIn = async ({ email, password }: TUser) => {
    const user = await pool.query(
        `
        SELECT id,name,email,phone,role,password FROM users WHERE email=$1 
    `,
        [email]
    );
    if (!user?.rowCount) {
        throw new AppError(StatusCodes.BAD_REQUEST, 'Email not found. Please sign up!');
    }
    const decryptPass = await compare(password, user?.rows[0]?.password);
    if (!decryptPass) {
        throw new AppError(StatusCodes.BAD_REQUEST, "Oops password did'nt matched!");
    }
    const userData = { ...user?.rows[0] };
    delete userData?.password;

    // non blocking
    const generateToken = new Promise((resolve, reject) => {
        sign(
            { email: userData?.email, role: userData?.role },
            config.JWT_SECRET,
            {
                expiresIn: '7d',
            },
            function (err: any, token) {
                if (err) {
                    reject(err);
                }
                resolve(token);
            }
        );
    });

    return { token: await generateToken, user: userData };
};

const AuthServices = {
    signUp,
    signIn,
};

export default AuthServices;
