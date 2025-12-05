# 🏨 Quick Stay - Hotel Booking Platform

A full-stack MERN hotel booking application with Google OAuth, payment integration, and admin dashboard.

![Quick Stay](https://img.shields.io/badge/Quick%20Stay-Hotel%20Booking-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-Backend-339933)
![TypeScript](https://img.shields.io/badge/TypeScript-Type%20Safe-3178C6)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [Project Structure](#-project-structure)
- [API Endpoints](#-api-endpoints)
- [Deployment](#-deployment)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### User Features
- 🔐 **Authentication** - JWT-based auth with Google OAuth integration
- 🏨 **Hotel Search & Booking** - Browse and book hotels with filters
- 💳 **Mock Payment System** - Secure booking with mock payment processing
- 📱 **Responsive Design** - Mobile-first, beautiful UI with Tailwind CSS
- 📊 **User Dashboard** - View bookings with detailed breakdowns
- 🗺️ **Interactive Maps** - Location-based hotel search
- ⭐ **Reviews & Ratings** - Hotel ratings and reviews
- 🎨 **Premium UI/UX** - Modern design with animations

### Admin Features
- 📈 **Analytics Dashboard** - Revenue, bookings, and performance metrics
- 📊 **Interactive Charts** - Line, bar, and pie charts with Recharts
- 🏨 **Hotel Management** - Full CRUD operations for hotels
- 💼 **Booking Management** - View and manage all bookings
- 👥 **User Management** - Admin controls and permissions
- 🔍 **Advanced Filters** - Search, sort, and filter capabilities

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **Axios** - HTTP client
- **React Router** - Navigation
- **Lucide React** - Icons

### Backend
- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JSON Web Token** - Authentication
- **Google OAuth 2.0** - Social login
- **TypeScript** - Type safety

### Tools & Services
- **MongoDB Atlas** - Cloud database
- **Vercel** - Frontend deployment
- **Git/GitHub** - Version control
- **Amadeus API** - Hotel data (optional)

## 📦 Prerequisites

Before running this application, make sure you have:

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account
- **Google Cloud Console** account (for OAuth)
- **Git**

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

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/google` - Google OAuth login
- `GET /api/auth/me` - Get current user

### Hotels
- `GET /api/hotels/search` - Search hotels
- `GET /api/hotels/all` - Get all hotels (with filters)
- `GET /api/hotels/:id` - Get hotel by ID
- `POST /api/hotels` - Create hotel (Admin only)
- `PUT /api/hotels/:id` - Update hotel (Admin only)
- `DELETE /api/hotels/:id` - Delete hotel (Admin only)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/my-bookings` - Get user's bookings
- `GET /api/bookings` - Get all bookings (Admin only)
- `GET /api/bookings/stats` - Get booking statistics (Admin only)

### Rooms
- `GET /api/rooms` - Get all rooms
- `GET /api/rooms/:id` - Get room by ID
- `POST /api/rooms` - Create room (Admin only)
- `PUT /api/rooms/:id` - Update room (Admin only)
- `DELETE /api/rooms/:id` - Delete room (Admin only)

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
