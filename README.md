# User Management API

This is a **User Authentication Management API** built with **Express.js** and **TypeScript**, providing endpoints for user authentication, registration, profile management, email verification, and password management. It is designed to be consumed by a frontend application (React, Angular, Vue, etc.).

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Postman collection:- https://akshats-team-3223.postman.co/workspace/My-Workspace~ca13ed82-1873-4c2e-83b7-277bd3c9d180/collection/42373492-aa3c34f0-52cf-41ee-81fa-1ce1a8639c2e?action=share&creator=42373492 ]
3. [Installation](#installation)
4. [API Endpoints](#api-endpoints), https://www.npmjs.com/package/redis-jwt-auth

   * [User Retrieval](#user-retrieval)
   * [Authentication](#authentication)
   * [Email Verification & OTP](#email-verification--otp)
   * [Password Management](#password-management)
5. [Frontend Integration](#frontend-integration)
6. [Error Handling](#error-handling)
7. [Attributes for Styling](#attributes-for-styling)
8. [Notes](#notes)

---

## Getting Started

This API manages all user-related operations, including:

* Creating new users (`createUser`)
* Logging in and logging out (`loginUser` / `logoutUser`)
* Accessing the authenticated user's profile (`getUserProfile`)
* Sending and verifying OTP for email verification (`sendVerifyOTP` / `verifyEmail`)
* Resetting forgotten passwords (`forgotPassword` / `resetPassword`)
* Refreshing JWT tokens (`rotateRefreshToken`)
* Caching is used in the package redis-jwt-auth for caching of tokens.

It uses a `userService` layer for all database interactions and business logic, ensuring the controller is clean and modular.

---

## Installation

1. Clone the repository:

```bash
git clone <repo-url>
cd <repo-folder>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file for environment variables (JWT secrets, DB credentials, etc.):

```env
PORT=5000
JWT_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_refresh_token_secret
DATABASE_URL=mongodb://localhost:27017/yourdb
EMAIL_USER=your-email
EMAIL_PASS=your-password
```

4. Start the server:

```bash
npm run dev
```

Server runs on `http://localhost:5000` (by default).

---

## API Endpoints

### User Retrieval

#### Get All Users

```http
GET api/v1/users
```

**Response:**

```json
{
  "data": [ { "id": 1, "name": "John Doe", "email": "john@example.com" }, ... ],
  "message": "Data fetched successfully"
}
```

#### Get User by Email

```http
POST api/v1/users/email
```

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "data": { "id": 1, "name": "John Doe", "email": "john@example.com" },
  "message": "User fetched successfully"
}
```

#### Get User Profile

```http
GET api/v1/users/profile
```

Requires authentication (JWT token in headers).

**Response:**

```json
{
  "data": { "id": 1, "name": "John Doe", "email": "john@example.com" },
  "message": "User profile fetched successfully"
}
```

---

### Authentication

#### Create User (Register)

```http
POST api/v1/Auth/register
```

**Request Body:**

```json
{
  "name": "Akshat Jain",
  "email": "abcd@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "data": { "id": 1, "name": "Akshat Jain", "email": "abcd@example.com" },
  "message": "User created successfully"
}
```

#### Login User

```http
POST api/v1/Auth/login
```

**Request Body:**

```json
{
  "email": "abcd@example.com",
  "password": "password123"
}
```

**Response:**

```json
{
  "token": "<JWT_TOKEN>",
  "message": "Success"
}
```

#### Logout User

```http
POST api/v1/Auth/logout
```

Requires authentication.

**Response:**

```json
{
  "data": 1,
  "message": "User logout successful"
}
```

#### Refresh Token

```http
POST api/v1/Auth/refresh
```

**Request Body:**

```json
{
  "refreshToken": "<REFRESH_TOKEN>"
}
```

**Response:**

```json
{
  "message": "user refreshed successfully"
}
```

---

### Email Verification & OTP

#### Send Verify OTP

```http
POST api/v1/Auth/send-verify-otp
```

Requires authentication.

**Response:**

```json
{
  "otp": "123456",
  "message": "Otp sent successfully."
}
```

#### Verify Email

```http
POST api/v1/Auth/verify-email
```

**Request Body:**

```json
{
  "otp": "123456"
}
```

**Response:**

```json
{
  "message": "Email has been verified"
}
```

---

### Password Management

#### Forgot Password

```http
POST api/v1/Auth/forgot-password
```

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response:**

```json
{
  "message": "If this email exists, email will be sent."
}
```

#### Reset Password

```http
POST api/v1/Auth/reset-password/:token
```

**Request Body:**

```json
{
  "newPassword": "newPassword123"
}
```

**Response:**

```json
{
  "message": "Password has been changed successfully"
}
```

---

## Frontend Integration

For frontend applications:

* **Login**: Save `token` in local storage or cookies. Use it in `Authorization: Bearer <token>` header for protected routes.
* **Profile**: Call `/users/profile` using the JWT to fetch user data.
* **Email Verification**: After registration, call `/users/send-verify-otp`, then `/users/verify-email`.
* **Password Reset**: Initiate via `/users/forgot-password` → link sent in email → frontend collects token → call `/users/reset-password/:token`.

**Example Fetch Call:**

```ts
const token = localStorage.getItem("token");

fetch("http://localhost:5000/users/profile", {
  headers: { "Authorization": `Bearer ${token}` }
})
.then(res => res.json())
.then(data => console.log(data));
```

---

## Error Handling

* **400**: Bad request (missing required fields)
* **404**: Not found (user or token not found)
* **500**: Internal server errors

Responses always include a `message` and optionally an `error` field:

```json
{
  "message": "Email is required",
  "error": "ValidationError"
}
```

---

## Attributes for Styling

When integrating with the frontend, the following attributes are recommended for UI styling and component mapping:

| Endpoint                           | UI Component | Attributes / Classes                                              |
| -----------------------------------| ------------ | ----------------------------------------------------------------- |
| GET /api/v1/users                  | Table/List   | `user-list`, `user-row`                                           |
| GET /api/v1/users/profile          | Profile Card | `profile-card`, `profile-name`, `profile-email`                   |
| POST /api/v1/Auth/login            | Form         | `form-login`, `input-email`, `input-password`, `btn-login`        |
| POST /api/v1/Auth/logout           | Button       | `btn-logout`                                                      |
| POST /api/v1/Auth/send-verify-otp  | Button/Input | `btn-send-otp`, `input-otp`                                       |
| POST /api/v1/Auth/verify-email     | Form         | `form-verify-email`, `input-otp`, `btn-verify`                    |
| POST /api/v1/Auth/forgot-password  | Form         | `form-forgot-password`, `input-email`, `btn-send-email`           |
| POST /api/v1/Auth/reset-password   | Form         | `form-reset-password`, `input-new-password`, `btn-reset`          |

> These attributes can be used as `id` or `class` in your frontend code for consistent styling and easier DOM manipulation.

---

## Notes

* All endpoints are asynchronous (`async/await`) for non-blocking I/O.
* `userService` layer handles all database operations, so you can easily swap DBs (MongoDB, MySQL, PostgreSQL).
* JWT-based authentication is used for secure access.
* OTP verification and password reset are email-driven.
* redis-jwt-auth is used. (https://www.npmjs.com/package/redis-jwt-auth)
