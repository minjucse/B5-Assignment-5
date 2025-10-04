# 🚖 Ride Booking System - Backend API

This project is a secure, scalable, and role-based backend API for a ride-booking system, similar to **Uber** or **Pathao**.  
Built with **Node.js**, **Express.js**, **TypeScript**, and **Mongoose**. It supports three primary roles: **Rider**, **Driver**, and **Admin** — each with dedicated permissions and endpoints.

## 🚀 Features

### 🔐 Authentication
- JWT-based login with **Access** and **Refresh Tokens**.  
- Tokens are stored securely in **httpOnly cookies** to prevent XSS attacks.  

### 🛡️ Role-Based Authorization
- Custom middleware to protect routes based on user roles:
  - **Rider**
  - **Driver**
  - **Admin**

### 👥 User Management
- Admins can:
  - View all users
  - Block or unblock user accounts  

### 🚘 Driver Lifecycle
- Riders can apply to become **Drivers**.  
- Admins review applications and **approve** or **reject** them.  

### 🛺 Ride Lifecycle
- **Riders** can request rides.  
- **Drivers** can:
  - Accept ride requests  
  - Update ride status:
    - `PICKED_UP`  
    - `IN_TRANSIT`  
    - `COMPLETED`  
- **Riders** can cancel their ride requests.  

## ⚙️ Tech Stack

- **Runtime:** Node.js (v18+)  
- **Framework:** Express.js  
- **Language:** TypeScript  
- **Database:** MongoDB (Mongoose ODM)  
- **Authentication:** JWT (Access & Refresh Tokens)  
- **Validation:** Zod / Custom validation middlewares
  ## 🛠️ Setup & Installation

### 📋 Prerequisites
- **Node.js** v18+  
- **npm** or **yarn**  
- **MongoDB** (local instance or MongoDB Atlas)  

### ⚡ Installation Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/minjucse/Ride-Management-Server.git
   cd Ride-Management-Server

   ## 📦 Install & Run

### 1️⃣ Install Dependencies
```bash
npm install

## 2️⃣ Environment Setup

Create a **.env** file in the project root and configure the following variables:

```env
PORT=3000
DB_URL=mongodb://localhost:27017/Ride_Booking

# JWT
JWT_ACCESS_SECRET=access_secret
JWT_ACCESS_EXPIRES=1d
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES=7d

# BCRYPT
BCRYPT_SALT_ROUND=10

# SUPER ADMIN
SUPER_ADMIN_EMAIL=super@gmail.com
SUPER_ADMIN_PASSWORD=12345678

# Express Session
EXPRESS_SESSION_SECRET=express-session

## 3️⃣ Run the Server

### 🚧 Development (with hot reload)
```bash
npm run dev

## 🔑 Default Admin Credentials

- **Email:** `rider@test.com`  
- **Password:** `Rider123!`

## 📌 API Endpoints

**Base URL:** `/api/v1`

---

## 🔁 API Endpoints Summary

**Base URL:** `/api/v1`  

You can import all endpoints directly into **Postman** from the GitHub repo.

---

### 🔐 Authentication (`/auth`)

| Method | Endpoint           | Description                                        | Access       | Request Body                                    |
|--------|------------------|----------------------------------------------------|-------------|-----------------------------------------------|
| POST   | `/login`          | Logs in a user and returns tokens.                 | Public      | `{ "email", "password" }`                     |
| POST   | `/refresh-token`  | Generates a new access token using refresh token. | Public      | Empty                                         |
| POST   | `/logout`         | Clears the authentication cookies.                | Authenticated | Empty                                       |
| POST   | `/reset-password` | Allows a logged-in user to change their password.| Authenticated | `{ "oldPassword", "newPassword" }`           |

---

### 🧍 User (`/user`)

| Method | Endpoint      | Description                              | Access       | Request Body                                      |
|--------|--------------|------------------------------------------|-------------|-------------------------------------------------|
| POST   | `/register`   | Registers a new user (defaults to Rider) | Public      | `{ "name", "email", "password", "phone" }`     |
| PATCH  | `/:id`        | Updates a user's own profile             | Authenticated | `{ "name", "phone", "address" }`              |
| GET    | `/all-users`  | Retrieves a list of all users             | Admin       | Empty                                           |

---

### 🚕 Driver (`/drivers`)

| Method | Endpoint             | Description                              | Access  | Request Body                                        |
|--------|--------------------|------------------------------------------|--------|---------------------------------------------------|
| POST   | `/apply`            | A Rider applies to become a Driver       | Rider  | `{ "licenseNumber", "licenseImage", "vehicleDetails": {...} }` |
| PATCH  | `/me/availability`  | A Driver sets availability Online/Offline | Driver | `{ "isAvailable": true/false }`                  |

---

### ⚙️ Admin (`/admin`)

| Method | Endpoint                               | Description                             | Access | Request Body                    |
|--------|----------------------------------------|-----------------------------------------|-------|---------------------------------|
| PATCH  | `/users/:id/status`                     | Blocks or activates a user account      | Admin | `{ "status": "BLOCK" or "ACTIVE" }` |
| GET    | `/driver-applications`                  | Gets all pending driver applications    | Admin | Empty                           |
| PATCH  | `/driver-applications/:id/approve`     | Approves a driver application           | Admin | Empty                           |
| PATCH  | `/driver-applications/:id/reject`      | Rejects a driver application            | Admin | Empty                           |

---

### 🚗 Ride (`/rides`)

| Method | Endpoint             | Description                                               | Access         | Request Body                                             |
|--------|--------------------|-----------------------------------------------------------|----------------|--------------------------------------------------------|
| POST   | `/request`          | A Rider requests a new ride                               | Rider          | `{ "pickupLocation": {...}, "destinationLocation": {...} }` |
| PATCH  | `/:rideId/accept`   | A Driver accepts a ride request                            | Driver         | Empty                                                  |
| PATCH  | `/:rideId/status`   | A Driver updates the status of an ongoing ride            | Driver         | `{ "status": "PICKED_UP" or "IN_TRANSIT" or "COMPLETED" }` |
| PATCH  | `/:rideId/cancel`   | A Rider cancels their ride request                        | Rider          | Empty                                                  |
| GET    | `/history`          | Gets the ride history for the logged-in user              | Rider/Driver   | Empty                                                  |


