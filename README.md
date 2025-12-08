# 🚗 Vehicle Rental System

A robust backend API for managing vehicle rentals, built with modern technologies and best practices. This system provides comprehensive functionality for vehicle inventory management, customer bookings, and secure role-based authentication.

## 🌐 Live URL

**Live API:** [Add your deployment URL here]

**GitHub Repository:** [https://github.com/coderboy-raiyan/car-rental-basic-server](https://github.com/coderboy-raiyan/car-rental-basic-server)

---

## ✨ Features

### 🔐 Authentication & Authorization

- Secure user registration and login with JWT authentication
- Role-based access control (Admin and Customer roles)
- Password encryption using bcrypt
- Protected routes with token validation

### 🚙 Vehicle Management

- Create, read, update, and delete vehicle records (Admin only)
- Track vehicle availability status (available/booked)
- Support for multiple vehicle types (Car, Bike, Van, SUV)
- Public vehicle listing and detailed view

### 👥 User Management

- Admin can view and manage all users
- Users can update their own profiles
- Safe deletion with active booking validation
- Role management capabilities

### 📅 Booking System

- Create bookings with automatic price calculation
- Automatic vehicle availability updates
- Role-based booking views (Admin sees all, Customer sees own)
- Booking status management (active, cancelled, returned)
- Auto-return functionality when rental period ends
- Cancel booking with automatic vehicle availability restoration

### 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Role-based authorization
- Input validation and sanitization
- Protected API endpoints

---

## 🛠️ Technology Stack

### Backend Framework

- **Node.js** - Runtime environment
- **TypeScript** - Type-safe JavaScript
- **Express.js** - Web application framework

### Database

- **PostgreSQL** - Relational database
- **Neon** - Serverless Postgres platform

### Authentication & Security

- **jsonwebtoken** - JWT implementation
- **bcrypt** - Password hashing

### Development Tools

- **Bun** - Fast JavaScript runtime and package manager
- **ESLint** - Code linting
- **Prettier** - Code formatting

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v18 or higher) or **Bun** (v1.0 or higher)
- **PostgreSQL** (v14 or higher) or a Neon database account
- **npm** or **bun** package manager

---

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/coderboy-raiyan/car-rental-basic-server.git
cd car-rental-basic-server
```

### 2. Install Dependencies

Using npm:

```bash
npm install
```

Or using Bun:

```bash
bun install
```

### 3. Environment Configuration

Create a `.env` file in the root directory and add the following variables:

```env
# Database Configuration
DATABASE_URL=your_postgresql_connection_string

# JWT Configuration
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d

# Server Configuration
PORT=5000
NODE_ENV=development
```

**Example PostgreSQL Connection String:**

```
postgresql://username:password@localhost:5432/car_rental_db
```

**For Neon Database:**

```
postgresql://username:password@ep-xxxxx.region.neon.tech/dbname?sslmode=require
```

### 4. Database Setup

Run the following SQL commands to create the required tables:

```sql
-- Users Table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('admin', 'customer')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Vehicles Table
CREATE TABLE vehicles (
    id SERIAL PRIMARY KEY,
    vehicle_name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL CHECK (type IN ('car', 'bike', 'van', 'SUV')),
    registration_number VARCHAR(50) UNIQUE NOT NULL,
    daily_rent_price DECIMAL(10, 2) NOT NULL CHECK (daily_rent_price > 0),
    availability_status VARCHAR(20) DEFAULT 'available' CHECK (availability_status IN ('available', 'booked')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bookings Table
CREATE TABLE bookings (
    id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    vehicle_id INTEGER REFERENCES vehicles(id) ON DELETE CASCADE,
    rent_start_date DATE NOT NULL,
    rent_end_date DATE NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL CHECK (total_price > 0),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'returned')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CHECK (rent_end_date > rent_start_date)
);
```

### 5. Start the Development Server

Using npm:

```bash
npm run dev
```

Or using Bun:

```bash
bun run dev
```

The server will start at `http://localhost:5000` (or your configured PORT).

### 6. Build for Production

Using npm:

```bash
npm run build
npm start
```

Or using Bun:

```bash
bun run build
bun start
```

---

## 📖 Usage Instructions

### API Base URL

```
http://localhost:5000/api/v1
```

### Authentication Flow

1. **Register a new user:**

```bash
POST /api/v1/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "phone": "01712345678",
  "role": "customer"
}
```

2. **Login to get JWT token:**

```bash
POST /api/v1/auth/signin
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

3. **Use the token for protected routes:**

```bash
GET /api/v1/bookings
Authorization: Bearer <your_jwt_token>
```

### Example API Calls

#### Create a Vehicle (Admin only)

```bash
POST /api/v1/vehicles
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "vehicle_name": "Toyota Camry 2024",
  "type": "car",
  "registration_number": "ABC-1234",
  "daily_rent_price": 50,
  "availability_status": "available"
}
```

#### Get All Vehicles (Public)

```bash
GET /api/v1/vehicles
```

#### Create a Booking (Customer or Admin)

```bash
POST /api/v1/bookings
Authorization: Bearer <token>
Content-Type: application/json

{
  "customer_id": 1,
  "vehicle_id": 2,
  "rent_start_date": "2024-01-15",
  "rent_end_date": "2024-01-20"
}
```

---

## 📚 API Documentation

For complete API documentation with detailed request/response specifications, please refer to:

- **[API Reference](https://github.com/coderboy-raiyan/car-rental-basic-server/blob/main/API_REFERENCE.md)** - Comprehensive endpoint documentation

### Quick Reference

| Category     | Endpoints                      | Access                                |
| ------------ | ------------------------------ | ------------------------------------- |
| **Auth**     | `/auth/signup`, `/auth/signin` | Public                                |
| **Vehicles** | `/vehicles`, `/vehicles/:id`   | Public (GET), Admin (POST/PUT/DELETE) |
| **Users**    | `/users`, `/users/:id`         | Admin only                            |
| **Bookings** | `/bookings`, `/bookings/:id`   | Customer (own), Admin (all)           |

---

## 🏗️ Project Structure

```
car-rental-basic-server/
├── src/
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.routes.ts
│   │   │   └── auth.validation.ts
│   │   ├── vehicles/
│   │   │   ├── vehicle.controller.ts
│   │   │   ├── vehicle.service.ts
│   │   │   ├── vehicle.routes.ts
│   │   │   └── vehicle.validation.ts
│   │   ├── users/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.service.ts
│   │   │   ├── user.routes.ts
│   │   │   └── user.validation.ts
│   │   └── bookings/
│   │       ├── booking.controller.ts
│   │       ├── booking.service.ts
│   │       ├── booking.routes.ts
│   │       └── booking.validation.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   ├── config/
│   │   └── database.ts
│   ├── utils/
│   │   ├── jwt.util.ts
│   │   └── response.util.ts
│   ├── types/
│   │   └── index.ts
│   └── app.ts
├── .env
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

---

## 🧪 Testing

To test the API endpoints, you can use tools like:

- **Postman** - [Download Collection](link-to-postman-collection)
- **Thunder Client** - VS Code extension
- **cURL** - Command line tool

---

## 🔒 Security Best Practices

This project implements several security measures:

1. **Password Security**: All passwords are hashed using bcrypt before storage
2. **JWT Authentication**: Secure token-based authentication with expiration
3. **Role-Based Access**: Different permission levels for Admin and Customer
4. **Input Validation**: All inputs are validated before processing
5. **SQL Injection Prevention**: Using parameterized queries
6. **Environment Variables**: Sensitive data stored in .env file

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Coderboy Raiyan**

- GitHub: [@coderboy-raiyan](https://github.com/coderboy-raiyan)

---

## 🙏 Acknowledgments

- Apollo Level 2 Web Development Course
- Express.js community
- PostgreSQL community
- Neon Database team

---

**Made with ❤️ by Coderboy Raiyan**
