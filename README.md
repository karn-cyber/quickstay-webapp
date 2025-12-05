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

**Base URL:** `https://quickstay-webapp-production.up.railway.app/api`  
**Local Development:** `http://localhost:5002/api`

### Authentication Endpoints

#### Register New User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 201 Created
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "user"
  }
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}

Response: 200 OK
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": { ... }
}
```

#### Google OAuth Login
```http
POST /auth/google
Content-Type: application/json

{
  "token": "google_oauth_id_token"
}

Response: 200 OK
{
  "token": "jwt_token",
  "user": { ... }
}
```

#### Get Current User
```http
GET /auth/me
Authorization: Bearer {jwt_token}

Response: 200 OK
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

---

### Hotel Endpoints

#### Search Hotels
```http
GET /hotels/search?location={location}&priceMin={min}&priceMax={max}

Response: 200 OK
[
  {
    "id": "hotel123",
    "name": "Luxury Grand Hotel",
    "location": {
      "address": "123 Main St, Mumbai, India",
      "latitude": 19.0760,
      "longitude": 72.8777
    },
    "description": "5-star luxury hotel...",
    "rating": 4.8,
    "price": 15000,
    "images": ["url1", "url2"],
    "amenities": ["WiFi", "Pool", "Spa"]
  }
]
```

####Get All Hotels (Paginated)
```http
GET /hotels/all?page=1&limit=10&sortBy=price&order=asc&search=Mumbai
Authorization: Bearer {jwt_token} (Admin only)

Response: 200 OK
{
  "data": [...hotels],
  "pagination": {
    "page": 1,
    "limit": 10,
    "totalPages": 5,
    "totalItems": 45
  }
}
```

#### Get Hotel by ID
```http
GET /hotels/:id

Response: 200 OK
{
  "id": "hotel123",
  "name": "Luxury Grand Hotel",
  ...
}
```

#### Create Hotel (Admin)
```http
POST /hotels
Authorization: Bearer {admin_jwt_token}
Content-Type: application/json

{
  "name": "New Hotel",
  "location": {
    "address": "456 Park Ave, Delhi",
    "latitude": 28.6139,
    "longitude": 77.2090
  },
  "description": "Modern hotel with excellent amenities",
  "rating": 4.5,
  "price": 12000,
  "images": ["image_url"],
  "amenities": ["WiFi", "Gym"]
}

Response: 201 Created
```

#### Update Hotel (Admin)
```http
PUT /hotels/:id
Authorization: Bearer {admin_jwt_token}
Content-Type: application/json

{
  "price": 13000,
  "rating": 4.7
}

Response: 200 OK
```

#### Delete Hotel (Admin)
```http
DELETE /hotels/:id
Authorization: Bearer {admin_jwt_token}

Response: 200 OK
{
  "message": "Hotel deleted successfully"
}
```

---

### Booking Endpoints

#### Create Booking
```http
POST /bookings
Authorization: Bearer {jwt_token}
Content-Type: application/json

{
  "room": "room123",
  "hotelName": "Luxury Grand Hotel",
  "hotelImage": "image_url",
  "checkInDate": "2024-12-20",
  "checkOutDate": "2024-12-25",
  "totalPrice": 75000
}

Response: 201 Created
{
  "_id": "booking123",
  "user": "user123",
  "room": "room123",
  "hotelName": "Luxury Grand Hotel",
  "status": "confirmed",
  ...
}
```

#### Get My Bookings
```http
GET /bookings/my-bookings
Authorization: Bearer {jwt_token}

Response: 200 OK
[
  {
    "_id": "booking123",
    "hotelName": "Luxury Grand Hotel",
    "hotelImage": "image_url",
    "checkInDate": "2024-12-20T00:00:00.000Z",
    "checkOutDate": "2024-12-25T00:00:00.000Z",
    "status": "confirmed",
    "totalPrice": 75000,
    "createdAt": "2024-12-01T10:30:00.000Z"
  }
]
```

#### Get All Bookings (Admin)
```http
GET /bookings
Authorization: Bearer {admin_jwt_token}

Response: 200 OK
[...all bookings with user details]
```

#### Get Booking Statistics (Admin)
```http
GET /bookings/stats
Authorization: Bearer {admin_jwt_token}

Response: 200 OK
{
  "totalBookings": 150,
  "totalRevenue": 2250000,
  "bookingsByStatus": [
    { "_id": "confirmed", "count": 120 },
    { "_id": "cancelled", "count": 30 }
  ],
  "monthlyBookings": [
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
    }
  ],
  "recentBookings": [...]
}
```

#### Cancel Booking
```http
PATCH /bookings/:id/cancel
Authorization: Bearer {jwt_token}

Response: 200 OK
{
  "message": "Booking cancelled successfully",
  "booking": {
    "_id": "booking123",
    "status": "cancelled",
    ...
  }
}
```

---

### Room Endpoints

#### Get All Rooms
```http
GET /rooms?page=1&limit=10&hotelId=hotel123

Response: 200 OK
{
  "data": [
    {
      "_id": "room123",
      "hotel": {...hotel details},
      "name": "Deluxe Suite",
      "description": "Spacious room with city view",
      "price": 15000,
      "capacity": 2,
      "amenities": ["WiFi", "TV", "AC"],
      "images": ["image_url"]
    }
  ],
  "pagination": {...}
}
```

#### Get Room by ID
```http
GET /rooms/:id

Response: 200 OK
{
  "_id": "room123",
  "hotel": {...},
  ...
}
```

#### Create Room (Admin)
```http
POST /rooms
Authorization: Bearer {admin_jwt_token}
Content-Type: application/json

{
  "hotel": "hotel123",
  "name": "Presidential Suite",
  "description": "Luxury suite with premium amenities",
  "price": 25000,
  "capacity": 4,
  "amenities": ["WiFi", "Jacuzzi", "Butler Service"],
  "images": ["image_url"]
}

Response: 201 Created
```

#### Update Room (Admin)
```http
PUT /rooms/:id
Authorization: Bearer {admin_jwt_token}

Response: 200 OK
```

#### Delete Room (Admin)
```http
DELETE /rooms/:id
Authorization: Bearer {admin_jwt_token}

Response: 200 OK
```

---

### Authentication & Authorization

**All protected endpoints require:**
```http
Authorization: Bearer {jwt_token}
```

**Admin-only endpoints additionally require:**
- User role must be `admin`
- Checked via `adminMiddleware`

**Token expiration:** 30 days  
**Token storage:** Browser localStorage (client-side)

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
