# 🏨 Quick Stay - Hotel Booking Platform

> **A Modern Full-Stack Hotel Booking System | Academic Project**

A comprehensive MERN stack hotel booking application featuring Google OAuth authentication, real-time booking management, interactive analytics dashboard, and seamless payment integration. Built as an academic capstone project demonstrating modern web development practices.

![Quick Stay](https://img.shields.io/badge/Quick%20Stay-Hotel%20Booking-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933)
![TypeScript](https://img.shields.io/badge/TypeScript-Type%20Safe-3178C6)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black)
![Railway](https://img.shields.io/badge/Railway-Backend-purple)

---

## 🎯 Project Purpose

**Quick Stay** is a comprehensive hotel booking platform developed as an **Academic Capstone Project** to demonstrate:

- **Full-Stack Development** - Complete MERN stack implementation
- **Modern Architecture** - RESTful API, JWT authentication, role-based access
- **Cloud Deployment** - Frontend on Vercel, Backend on Railway, Database on MongoDB Atlas
- **Real-World Features** - Payment integration, booking management, analytics
- **Professional Practices** - TypeScript, Git version control, environment-based configuration
- **User Experience** - Responsive design, smooth animations, intuitive interface

**Academic Context:** This project showcases skills in web development, database design, API development, authentication, deployment, and modern development workflows required in professional software engineering roles.

---

## 📋 Table of Contents

- [Project Purpose](#-project-purpose)
- [Features](#-features)
- [Complete Tech Stack](#-complete-tech-stack)
- [Hosting & Deployment](#-hosting--deployment)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [Complete API Documentation](#-complete-api-documentation)
- [Database Schema](#-database-schema)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔐 User Features
- **Authentication & Authorization**
  - JWT-based secure authentication
  - Google OAuth 2.0 social login
  - Protected routes and API endpoints
  - Role-based access control (User/Admin)

- **Hotel Discovery**
  - Advanced search with location filters
  - Real-time hotel availability
  - Interactive hotel listings with pagination (9 per page)
  - Detailed hotel pages with images, amenities, ratings
  - Price filtering and sorting

- **Booking Management**
  - Seamless booking flow
  - Mock payment confirmation system
  - Real-time booking status updates
  - Booking history with detailed breakdowns
  - Cancel bookings functionality
  - View past and upcoming reservations

- **User Dashboard**
  - Personal booking statistics
  - Expandable booking details
  - Total spent tracking
  - Booking status management

### 👨‍💼 Admin Features
- **Analytics Dashboard**
  - Total revenue and bookings metrics
  - Monthly trends (Line charts)
  - Revenue breakdown (Bar charts)
  - Booking status distribution (Pie charts)
  - Top performing hotels
  - Recent bookings table

- **Hotel Management**
  - Create, Read, Update, Delete (CRUD) hotels
  - Upload multiple hotel images
  - Manage amenities and pricing
  - Location mapping (latitude/longitude)
  - Advanced search and filtering

- **Booking Oversight**
  - View all platform bookings
  - User information access
  - Booking analytics and reports

---

## 🛠️ Complete Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI library for building component-based interfaces |
| **TypeScript** | Type-safe JavaScript for better code quality |
| **Vite** | Fast build tool and development server |
| **Tailwind CSS** | Utility-first CSS framework for styling |
| **Framer Motion** | Smooth animations and transitions |
| **Recharts** | Data visualization (charts and graphs) |
| **Axios** | HTTP client for API requests |
| **React Router** | Client-side routing and navigation |
| **Lucide React** | Modern icon library |

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js (v18+)** | JavaScript runtime environment |
| **Express.js** | Web application framework |
| **MongoDB** | NoSQL database for data storage |
| **Mongoose** | MongoDB ODM for schema validation |
| **JSON Web Token (JWT)** | Secure authentication tokens |
| **Google OAuth 2.0** | Social authentication |
| **bcrypt** | Password hashing and encryption |
| **TypeScript** | Type safety for backend code |
| **dotenv** | Environment variable management |

### Development Tools
| Tool | Purpose |
|------|---------|
| **Git & GitHub** | Version control and collaboration |
| **ESLint** | Code linting and quality checks |
| **Prettier** | Code formatting |
| **Nodemon** | Auto-restart dev server |
| **ts-node** | TypeScript execution for Node.js |

### Cloud Services & Deployment
| Service | Purpose |
|---------|---------|
| **MongoDB Atlas** | Cloud-hosted MongoDB database |
| **Vercel** | Frontend hosting and deployment |
| **Railway** | Backend API hosting |
| **Google Cloud Console** | OAuth credentials management |

---

## 🌐 Hosting & Deployment

### Production URLs
- **Frontend:** [https://quickstay-webapp.vercel.app](https://quickstay-webapp.vercel.app)
- **Backend API:** [https://quickstay-webapp-production.up.railway.app](https://quickstay-webapp-production.up.railway.app)
- **Database:** MongoDB Atlas (Cluster0)

### Deployment Architecture
```
┌─────────────────────┐
│   User's Browser    │
└──────────┬──────────┘
           │
           ├─── Frontend (Vercel) ─────────┐
           │    - React Application        │
           │    - Static Assets             │
           │    - Environment: Production   │
           └────────────────────────────────┘
                     │
                     │ API Calls (HTTPS)
                     ↓
           ┌────────────────────────────────┐
           │  Backend API (Railway)         │
           │  - Node.js + Express           │
           │  - RESTful Endpoints           │
           │  - JWT Authentication          │
           └──────────┬─────────────────────┘
                     │
                     │ Database Queries
                     ↓
           ┌────────────────────────────────┐
           │  MongoDB Atlas                 │
           │  - User Data                   │
           │  - Hotels, Rooms, Bookings     │
           │  - Replicated Cluster          │
           └────────────────────────────────┘
```

### Environment Configuration
- **Development:** `localhost:5173` (Frontend), `localhost:5002` (Backend)
- **Production:** Environment variables managed through Vercel and Railway dashboards
- **Security:** All secrets stored in environment variables, not in code

---

## 📦 Prerequisites

Before running this application, ensure you have:

- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** or **yarn** package manager
- **MongoDB Atlas** account - [Sign up](https://www.mongodb.com/cloud/atlas)
- **Google Cloud Console** account - [Console](https://console.cloud.google.com/)
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation

### 1. Clone the repository

```bash
git clone https://github.com/karn-cyber/quickstay-webapp.git
cd quickstay-webapp
```

### 2. Install dependencies

```bash
# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install
```

## 🔐 Environment Variables

### Server (.env in `/server` directory)

Create a `.env` file in the `server` directory:

```env
# Server Configuration
PORT=5002
NODE_ENV=development

# Database
MONGODB_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_secure_jwt_secret_key

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

# Amadeus API (Optional)
AMADEUS_CLIENT_ID=your_amadeus_client_id
AMADEUS_CLIENT_SECRET=your_amadeus_client_secret

# Razorpay (Optional - for future real payments)
RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_key_secret
```

### Client (.env in `/client` directory)

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:5002/api
```

For production, create `.env.production`:

```env
VITE_API_URL=https://your-backend-url.com/api
```

## 🏃 Running the Application

### Development Mode

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```
Server runs on `http://localhost:5002`

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
Frontend runs on `http://localhost:5173`

### Production Build

**Build Frontend:**
```bash
cd client
npm run build
```

**Build Backend:**
```bash
cd server
npm run build
npm start
```

## 📁 Project Structure

```
quickstay-webapp/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── layouts/      # Layout components
│   │   ├── context/      # React context
│   │   ├── lib/          # Utilities & API
│   │   └── App.tsx       # Main app component
│   ├── public/           # Static assets
│   └── package.json
│
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── models/       # Mongoose models
│   │   ├── controllers/  # Route controllers
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Custom middleware
│   │   ├── services/     # Business logic
│   │   └── index.ts      # Server entry point
│   └── package.json
│
├── vercel.json           # Vercel configuration
└── README.md
```

---

## 🔌 Complete API Documentation

**Base URL (Production):** `https://quickstay-webapp-production.up.railway.app/api`  
**Base URL (Development):** `http://localhost:5002/api`

**Total Routes:** 26 endpoints across 6 route modules

---

### 🔐 Authentication Routes (`/api/auth`)

All authentication endpoints are public and do not require a JWT token.

#### 1. Register New User
**Endpoint:** `POST /auth/register`

**Description:** Create a new user account with email and password.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "507f1f77bcf86cd799439011",
  "role": "user",
  "name": "John Doe",
  "email": "john@example.com",
  "picture": null
}
```

**Error Responses:**
- `400` - User already exists
- `500` - Server error

---

#### 2. Login User
**Endpoint:** `POST /auth/login`

**Description:** Authenticate user with email and password.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "507f1f77bcf86cd799439011",
  "role": "user",
  "name": "John Doe",
  "email": "john@example.com",
  "picture": null
}
```

**Error Responses:**
- `400` - Invalid credentials
- `500` - Server error

---

#### 3. Google OAuth Login
**Endpoint:** `POST /auth/google`

**Description:** Authenticate user via Google OAuth 2.0.

**Request Body:**
```json
{
  "token": "google_oauth_id_token_from_frontend"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "507f1f77bcf86cd799439011",
  "role": "user",
  "name": "John Doe",
  "email": "john@example.com",
  "picture": "https://lh3.googleusercontent.com/..."
}
```

**Error Responses:**
- `500` - Google login failed

---

### 🏨 Hotel Routes (`/api/hotels`)

#### 4. Search Hotels (Public)
**Endpoint:** `GET /hotels/search`

**Description:** Search hotels using legacy Amadeus API or mock data.

**Query Parameters:**
- `location` (optional) - Location to search (default: "ALL")

**Example:** `GET /hotels/search?location=Mumbai`

**Response (200 OK):**
```json
[
  {
    "id": "hotel123",
    "name": "Luxury Grand Hotel",
    "location": {
      "address": "123 Main St, Mumbai, India",
      "latitude": 19.0760,
      "longitude": 72.8777
    },
    "description": "5-star luxury hotel with premium amenities",
    "rating": 4.8,
    "price": 15000,
    "images": ["url1", "url2", "url3"],
    "amenities": ["WiFi", "Pool", "Spa", "Gym", "Restaurant"]
  }
]
```

---

#### 5. Get All Hotels with Pagination (Public)
**Endpoint:** `GET /hotels/all`

**Description:** Retrieve all hotels with advanced filtering, sorting, and pagination.

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Items per page
- `sortBy` (optional, default: "createdAt") - Field to sort by
- `order` (optional, default: "desc") - Sort order (asc/desc)
- `search` (optional) - Text search
- `minPrice` (optional) - Minimum price filter
- `maxPrice` (optional) - Maximum price filter
- `minRating` (optional) - Minimum rating filter
- `amenities` (optional) - Comma-separated amenities

**Example:** `GET /hotels/all?page=1&limit=9&sortBy=price&order=asc&search=Mumbai&minRating=4`

**Response (200 OK):**
```json
{
  "data": [
    {
      "_id": "6756ab...",
      "name": "Taj Hotel",
      "location": {...},
      "price": 12000,
      "rating": 4.5,
      "amenities": ["WiFi", "Pool"]
    }
  ],
  "pagination": {
    "total": 45,
    "page": 1,
    "limit": 9,
    "totalPages": 5
  }
}
```

---

#### 6. Get Hotel by ID (Public)
**Endpoint:** `GET /hotels/:id`

**Description:** Get detailed information about a specific hotel.

**Path Parameters:**
- `id` - Hotel ID (MongoDB ObjectId or legacy ID)

**Example:** `GET /hotels/6756ab1234567890abcdef12`

**Response (200 OK):**
```json
{
  "_id": "6756ab1234567890abcdef12",
  "name": "Luxury Grand Hotel",
  "location": {
    "address": "123 Main St, Mumbai",
    "latitude": 19.0760,
    "longitude": 72.8777
  },
  "description": "Premium 5-star hotel",
  "rating": 4.8,
  "price": 15000,
  "images": ["url1", "url2"],
  "amenities": ["WiFi", "Pool", "Spa"],
  "createdAt": "2024-11-15T10:30:00.000Z"
}
```

**Error Responses:**
- `404` - Hotel not found

---

#### 7. Create Hotel (Admin Only) 🔒
**Endpoint:** `POST /hotels`

**Authentication:** Required (Admin role)

**Description:** Create a new hotel in the database.

**Headers:**
```
Authorization: Bearer {admin_jwt_token}
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "New Boutique Hotel",
  "location": {
    "address": "456 Park Ave, Delhi, India",
    "latitude": 28.6139,
    "longitude": 77.2090
  },
  "description": "Modern boutique hotel with contemporary design",
  "rating": 4.5,
  "price": 12000,
  "images": ["https://example.com/image1.jpg"],
  "amenities": ["WiFi", "Gym", "Restaurant", "Room Service"]
}
```

**Response (201 Created):**
```json
{
  "_id": "6756ab1234567890abcdef13",
  "name": "New Boutique Hotel",
  "location": {...},
  "price": 12000,
  "createdAt": "2024-12-08T01:20:00.000Z"
}
```

---

#### 8. Update Hotel (Admin Only) 🔒
**Endpoint:** `PUT /hotels/:id`

**Authentication:** Required (Admin role)

**Description:** Update an existing hotel's details.

**Headers:**
```
Authorization: Bearer {admin_jwt_token}
```

**Request Body (partial update):**
```json
{
  "price": 13000,
  "rating": 4.7,
  "amenities": ["WiFi", "Pool", "Spa", "Gym"]
}
```

**Response (200 OK):**
```json
{
  "_id": "6756ab1234567890abcdef12",
  "name": "Luxury Grand Hotel",
  "price": 13000,
  "rating": 4.7,
  "updatedAt": "2024-12-08T01:25:00.000Z"
}
```

**Error Responses:**
- `404` - Hotel not found

---

#### 9. Delete Hotel (Admin Only) 🔒
**Endpoint:** `DELETE /hotels/:id`

**Authentication:** Required (Admin role)

**Description:** Delete a hotel from the database.

**Headers:**
```
Authorization: Bearer {admin_jwt_token}
```

**Response (200 OK):**
```json
{
  "message": "Hotel deleted successfully",
  "hotel": {...}
}
```

**Error Responses:**
- `404` - Hotel not found

---

### 📅 Booking Routes (`/api/bookings`)

#### 10. Create Booking 🔒
**Endpoint:** `POST /bookings`

**Authentication:** Required

**Description:** Create a new hotel booking.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Request Body:**
```json
{
  "room": "room123",
  "hotelName": "Luxury Grand Hotel",
  "hotelImage": "https://example.com/hotel.jpg",
  "checkInDate": "2024-12-20",
  "checkOutDate": "2024-12-25",
  "totalPrice": 75000
}
```

**Response (201 Created):**
```json
{
  "_id": "booking123",
  "user": "507f1f77bcf86cd799439011",
  "room": "room123",
  "hotelName": "Luxury Grand Hotel",
  "hotelImage": "https://example.com/hotel.jpg",
  "checkInDate": "2024-12-20T00:00:00.000Z",
  "checkOutDate": "2024-12-25T00:00:00.000Z",
  "totalPrice": 75000,
  "status": "confirmed",
  "createdAt": "2024-12-08T01:30:00.000Z"
}
```

**Error Responses:**
- `400` - Hotel name is required

---

#### 11. Get My Bookings 🔒
**Endpoint:** `GET /bookings/my-bookings`

**Authentication:** Required

**Description:** Get all bookings for the authenticated user.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response (200 OK):**
```json
[
  {
    "_id": "booking123",
    "hotelName": "Luxury Grand Hotel",
    "hotelImage": "https://example.com/hotel.jpg",
    "checkInDate": "2024-12-20T00:00:00.000Z",
    "checkOutDate": "2024-12-25T00:00:00.000Z",
    "status": "confirmed",
    "totalPrice": 75000,
    "createdAt": "2024-12-01T10:30:00.000Z"
  },
  {
    "_id": "booking124",
    "hotelName": "Beach Resort",
    "status": "cancelled",
    "totalPrice": 45000,
    "createdAt": "2024-11-15T14:20:00.000Z"
  }
]
```

---

#### 12. Get All Bookings (Admin Only) 🔒
**Endpoint:** `GET /bookings`

**Authentication:** Required (Admin role)

**Description:** Get all bookings across the platform with user details.

**Headers:**
```
Authorization: Bearer {admin_jwt_token}
```

**Response (200 OK):**
```json
[
  {
    "_id": "booking123",
    "user": {
      "_id": "507f...",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "hotelName": "Luxury Grand Hotel",
    "totalPrice": 75000,
    "status": "confirmed",
    "createdAt": "2024-12-01T10:30:00.000Z"
  }
]
```

---

#### 13. Get Booking Statistics (Admin Only) 🔒
**Endpoint:** `GET /bookings/stats`

**Authentication:** Required (Admin role)

**Description:** Get comprehensive booking analytics for admin dashboard.

**Headers:**
```
Authorization: Bearer {admin_jwt_token}
```

**Response (200 OK):**
```json
{
  "totalBookings": 150,
  "totalRevenue": 2250000,
  "bookingsByStatus": [
    { "_id": "confirmed", "count": 120 },
    { "_id": "cancelled", "count": 30 }
  ],
  "monthlyBookings": [
    {
      "_id": { "year": 2024, "month": 11 },
      "count": 35,
      "revenue": 525000
    },
    {
      "_id": { "year": 2024, "month": 12 },
      "count": 45,
      "revenue": 675000
    }
  ],
  "topHotels": [
    {
      "_id": "Luxury Grand Hotel",
      "bookings": 25,
      "revenue": 375000
    },
    {
      "_id": "Beach Resort",
      "bookings": 18,
      "revenue": 270000
    }
  ],
  "recentBookings": [
    {
      "_id": "booking123",
      "user": {...},
      "hotelName": "Luxury Grand Hotel",
      "totalPrice": 75000,
      "createdAt": "2024-12-01T10:30:00.000Z"
    }
  ]
}
```

---

#### 14. Cancel Booking 🔒
**Endpoint:** `PATCH /bookings/:id/cancel`

**Authentication:** Required (User must own the booking)

**Description:** Cancel an existing booking.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Path Parameters:**
- `id` - Booking ID

**Response (200 OK):**
```json
{
  "message": "Booking cancelled successfully",
  "booking": {
    "_id": "booking123",
    "status": "cancelled",
    "hotelName": "Luxury Grand Hotel",
    "totalPrice": 75000
  }
}
```

**Error Responses:**
- `404` - Booking not found
- `403` - Not authorized to cancel this booking
- `400` - Booking is already cancelled

---

#### 15. Update Booking Status (Admin Only) 🔒
**Endpoint:** `PATCH /bookings/:id/status`

**Authentication:** Required (Admin role)

**Description:** Update the status of any booking.

**Headers:**
```
Authorization: Bearer {admin_jwt_token}
```

**Request Body:**
```json
{
  "status": "completed"
}
```

**Valid Statuses:** `pending`, `confirmed`, `cancelled`, `completed`

**Response (200 OK):**
```json
{
  "message": "Booking status updated successfully",
  "booking": {
    "_id": "booking123",
    "status": "completed",
    "user": {...}
  }
}
```

**Error Responses:**
- `400` - Invalid status value
- `404` - Booking not found

---

### 🛏️ Room Routes (`/api/rooms`)

#### 16. Get All Rooms (Public)
**Endpoint:** `GET /rooms`

**Description:** Get all rooms with pagination and filtering.

**Query Parameters:**
- `page` (optional, default: 1) - Page number
- `limit` (optional, default: 10) - Items per page
- `sortBy` (optional, default: "createdAt") - Field to sort by
- `order` (optional, default: "desc") - Sort order
- `minPrice` (optional) - Minimum price filter
- `maxPrice` (optional) - Maximum price filter
- `type` (optional) - Room type filter
- `hotelId` (optional) - Filter by hotel ID

**Example:** `GET /rooms?page=1&limit=10&hotelId=6756ab...&minPrice=5000&maxPrice=20000`

**Response (200 OK):**
```json
{
  "data": [
    {
      "_id": "room123",
      "hotel": {
        "_id": "6756ab...",
        "name": "Luxury Grand Hotel",
        "location": {...}
      },
      "name": "Deluxe Suite",
      "description": "Spacious room with city view and premium amenities",
      "price": 15000,
      "capacity": 2,
      "amenities": ["WiFi", "TV", "AC", "Mini Bar"],
      "images": ["https://example.com/room1.jpg"],
      "createdAt": "2024-11-20T08:15:00.000Z"
    }
  ],
  "pagination": {
    "total": 28,
    "page": 1,
    "limit": 10,
    "totalPages": 3
  }
}
```

---

#### 17. Get Room by ID (Public)
**Endpoint:** `GET /rooms/:id`

**Description:** Get detailed information about a specific room.

**Path Parameters:**
- `id` - Room ID

**Response (200 OK):**
```json
{
  "_id": "room123",
  "hotel": {
    "_id": "6756ab...",
    "name": "Luxury Grand Hotel",
    "location": {...},
    "rating": 4.8
  },
  "name": "Deluxe Suite",
  "description": "Spacious room with city view",
  "price": 15000,
  "capacity": 2,
  "amenities": ["WiFi", "TV", "AC"],
  "images": ["url1", "url2"]
}
```

**Error Responses:**
- `404` - Room not found

---

#### 18. Create Room (Admin Only) 🔒
**Endpoint:** `POST /rooms`

**Authentication:** Required (Admin role)

**Description:** Create a new room for a hotel.

**Headers:**
```
Authorization: Bearer {admin_jwt_token}
```

**Request Body:**
```json
{
  "hotel": "6756ab1234567890abcdef12",
  "name": "Presidential Suite",
  "description": "Luxury suite with premium amenities and panoramic views",
  "price": 25000,
  "capacity": 4,
  "amenities": ["WiFi", "Jacuzzi", "Butler Service", "Ocean View"],
  "images": ["https://example.com/suite1.jpg", "https://example.com/suite2.jpg"]
}
```

**Response (201 Created):**
```json
{
  "_id": "room125",
  "hotel": {...},
  "name": "Presidential Suite",
  "price": 25000,
  "capacity": 4,
  "createdAt": "2024-12-08T01:35:00.000Z"
}
```

---

#### 19. Update Room (Admin Only) 🔒
**Endpoint:** `PUT /rooms/:id`

**Authentication:** Required (Admin role)

**Description:** Update an existing room's details.

**Headers:**
```
Authorization: Bearer {admin_jwt_token}
```

**Request Body (partial update):**
```json
{
  "price": 22000,
  "amenities": ["WiFi", "Jacuzzi", "Butler Service", "Ocean View", "Smart TV"]
}
```

**Response (200 OK):**
```json
{
  "_id": "room125",
  "hotel": {...},
  "name": "Presidential Suite",
  "price": 22000,
  "updatedAt": "2024-12-08T01:40:00.000Z"
}
```

**Error Responses:**
- `404` - Room not found

---

#### 20. Delete Room (Admin Only) 🔒
**Endpoint:** `DELETE /rooms/:id`

**Authentication:** Required (Admin role)

**Description:** Delete a room from the database.

**Headers:**
```
Authorization: Bearer {admin_jwt_token}
```

**Response (200 OK):**
```json
{
  "message": "Room deleted successfully",
  "room": {...}
}
```

**Error Responses:**
- `404` - Room not found

---

### 💳 Payment Routes (`/api/payments`)

#### 21. Create Payment Intent 🔒
**Endpoint:** `POST /payments/create-intent`

**Authentication:** Required

**Description:** Create a Razorpay order for payment processing.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Request Body:**
```json
{
  "amount": 7500000,
  "currency": "INR"
}
```

**Note:** Amount is in paise (smallest currency unit). 7500000 paise = ₹75,000

**Response (200 OK):**
```json
{
  "id": "order_MNqwertyuiop123",
  "currency": "INR",
  "amount": 7500000
}
```

**Error Responses:**
- `500` - Razorpay error

---

#### 22. Verify Payment 🔒
**Endpoint:** `POST /payments/verify`

**Authentication:** Required

**Description:** Verify Razorpay payment signature for security.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Request Body:**
```json
{
  "razorpay_order_id": "order_MNqwertyuiop123",
  "razorpay_payment_id": "pay_ABCxyz987654321",
  "razorpay_signature": "generated_signature_hash"
}
```

**Response (200 OK):**
```json
{
  "message": "Payment verified successfully"
}
```

**Error Responses:**
- `400` - Invalid signature sent
- `500` - Internal server error

---

### 💰 Transaction Routes (`/api/transactions`)

#### 23. Get User Transactions 🔒
**Endpoint:** `GET /transactions`

**Authentication:** Required

**Description:** Get all transactions for the authenticated user.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Response (200 OK):**
```json
[
  {
    "_id": "trans123",
    "user": "507f1f77bcf86cd799439011",
    "booking": {
      "_id": "booking123",
      "hotelName": "Luxury Grand Hotel",
      "totalPrice": 75000
    },
    "amount": 75000,
    "type": "payment",
    "status": "success",
    "createdAt": "2024-12-01T10:35:00.000Z"
  }
]
```

---

#### 24. Create Transaction 🔒
**Endpoint:** `POST /transactions`

**Authentication:** Required

**Description:** Create a new transaction record.

**Headers:**
```
Authorization: Bearer {jwt_token}
```

**Request Body:**
```json
{
  "booking": "booking123",
  "amount": 75000,
  "type": "payment"
}
```

**Response (201 Created):**
```json
{
  "_id": "trans124",
  "user": "507f1f77bcf86cd799439011",
  "booking": "booking123",
  "amount": 75000,
  "type": "payment",
  "status": "success",
  "createdAt": "2024-12-08T01:45:00.000Z"
}
```

---

### 🔒 Authentication & Authorization

#### JWT Token Usage
All protected endpoints require a JWT token in the Authorization header:

```http
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

#### Token Information
- **Expiration:** 1 hour (3600 seconds)
- **Storage:** Browser localStorage (client-side)
- **Payload:** Contains `userId` and `role`

#### Role-Based Access Control

**Public Routes (No authentication required):**
- All `/auth/*` routes
- `GET /hotels/search`
- `GET /hotels/all`
- `GET /hotels/:id`
- `GET /rooms`
- `GET /rooms/:id`

**User Routes (Authentication required):**
- `POST /bookings`
- `GET /bookings/my-bookings`
- `PATCH /bookings/:id/cancel`
- `POST /payments/create-intent`
- `POST /payments/verify`
- `GET /transactions`
- `POST /transactions`

**Admin Routes (Admin role required):**
- `POST /hotels`
- `PUT /hotels/:id`
- `DELETE /hotels/:id`
- `GET /bookings`
- `GET /bookings/stats`
- `PATCH /bookings/:id/status`
- `POST /rooms`
- `PUT /rooms/:id`
- `DELETE /rooms/:id`

#### Error Responses for Authentication

**401 Unauthorized:**
```json
{
  "message": "No token provided" 
}
```

**403 Forbidden:**
```json
{
  "message": "Admin access required"
}
```

---

### 📊 API Summary

| Route Module | Total Routes | Public | User Auth | Admin Only |
|--------------|--------------|--------|-----------|------------|
| Authentication | 3 | 3 | 0 | 0 |
| Hotels | 6 | 3 | 0 | 3 |
| Bookings | 6 | 0 | 3 | 3 |
| Rooms | 5 | 2 | 0 | 3 |
| Payments | 2 | 0 | 2 | 0 |
| Transactions | 2 | 0 | 2 | 0 |
| **Total** | **24** | **8** | **7** | **9** |

**Note:** Some routes serve dual purposes (e.g., bookings can be accessed by both users and admins with different permissions)

---

## 💾 Database Schema

### User Model
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  password: String (hashed),
  picture: String (for OAuth),
  role: String (enum: ['user', 'admin'], default: 'user'),
  createdAt: Date,
  updatedAt: Date
}
```

### Hotel Model
```javascript
{
  _id: ObjectId,
  name: String (required, indexed),
  location: {
    address: String (required),
    latitude: Number (required),
    longitude: Number (required)
  },
  description: String (required, indexed),
  rating: Number (0-5),
  price: Number (required, indexed),
  images: [String],
  amenities: [String],
  createdAt: Date,
  updatedAt: Date
}
```

### Booking Model
```javascript
{
  _id: ObjectId,
  user: ObjectId (ref: 'User', required),
  room: String (required),
  hotelName: String (required),
  hotelImage: String,
  checkInDate: Date (required),
  checkOutDate: Date (required),
  totalPrice: Number (required),
  status: String (enum: ['confirmed', 'cancelled'], default: 'confirmed'),
  createdAt: Date,
  updatedAt: Date
}
```

### Room Model
```javascript
{
  _id: ObjectId,
  hotel: ObjectId (ref: 'Hotel', required),
  name: String (required),
  description: String (required),
  price: Number (required),
  capacity: Number (required),
  amenities: [String],
  images: [String],
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🌐 Deployment

### Frontend (Vercel)

1. **Connect GitHub repository to Vercel**
2. **Configure build settings:**
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/dist`
3. **Add environment variables** in Vercel dashboard
4. **Deploy!**

### Backend (Render/Railway)

1. **Create new Web Service**
2. **Select repository and branch**
3. **Configure:**
   - Root Directory: `server`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
4. **Add environment variables**
5. **Deploy!**

📖 **Detailed deployment guide:** See [Deployment Guide](/.gemini/antigravity/brain/ee5a6544-899b-4abd-9634-2dd1c45c5728/vercel_deployment_guide.md)

## 📸 Screenshots

### Home Page
![Home Page](https://via.placeholder.com/800x400?text=Quick+Stay+Home+Page)

### Hotel Listing
![Hotel Listing](https://via.placeholder.com/800x400?text=Hotel+Search+Results)

### User Dashboard
![User Dashboard](https://via.placeholder.com/800x400?text=User+Dashboard)

### Admin Analytics
![Admin Dashboard](https://via.placeholder.com/800x400?text=Admin+Analytics+Dashboard)

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Neelanshu**  
- GitHub: [@karn-cyber](https://github.com/karn-cyber)

## 🙏 Acknowledgments

- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) for database hosting
- [Vercel](https://vercel.com) for frontend deployment
- [Amadeus API](https://developers.amadeus.com/) for hotel data
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Recharts](https://recharts.org/) for charts

---

⭐ **Star this repository if you found it helpful!**

📧 **Questions?** Feel free to open an issue or contact me!

🚀 **Live Demo:** [Coming Soon]

---

Made with ❤️ by Neelanshu
