import { Pool } from 'pg';
import config from '.';

export const pool = new Pool({
    connectionString: config.DB_URI,
});

export const initDB = async () => {
    await pool.query(`
           
            DO $$ BEGIN
                CREATE TYPE role_type AS ENUM ('admin', 'customer');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;

            DO $$ BEGIN
                CREATE TYPE vehicle_type AS ENUM ('car', 'bike', 'van', 'SUV');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;

            DO $$ BEGIN
                CREATE TYPE availability_status_type AS ENUM ('available', 'booked');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;

            DO $$ BEGIN
                CREATE TYPE booking_status_type AS ENUM ('active', 'cancelled', 'returned');
            EXCEPTION
                WHEN duplicate_object THEN null;
            END $$;

            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(50) UNIQUE NOT NULL,
                password TEXT NOT NULL,
                phone VARCHAR(14) NOT NULL,
                role role_type DEFAULT 'customer'
            );
            CREATE TABLE IF NOT EXISTS vehicles (
                id SERIAL PRIMARY KEY,
                vehicle_name VARCHAR(100) NOT NULL,
                type vehicle_type NOT NULL,
                registration_number TEXT UNIQUE NOT NULL,
                daily_rent_price INT CHECK(daily_rent_price >= 0) NOT NULL,
                availability_status availability_status_type DEFAULT 'available'
            );

            CREATE TABLE IF NOT EXISTS bookings (
                id SERIAL PRIMARY KEY,
                customer_id INT REFERENCES users(id) ON DELETE CASCADE,
                vehicle_id INT REFERENCES vehicles(id) ON DELETE CASCADE,
                rent_start_date DATE NOT NULL,
                rent_end_date DATE,
                total_price INT CHECK(total_price >= 0) DEFAULT 0,
                status booking_status_type NOT NULL
            );
           
        `);
};
