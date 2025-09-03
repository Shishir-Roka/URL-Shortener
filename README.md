# 🚀 URL Shortener

A modern, full-stack URL shortening service built with React, Node.js, Express, and PostgreSQL. Create short, memorable links with custom codes and manage them through an intuitive web interface.

![Project Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![React](https://img.shields.io/badge/React-19-blue.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15+-blue.svg)

## ✨ Features

- 🔐 **User Authentication**: Secure signup/login with JWT tokens
- 🎯 **URL Shortening**: Create short URLs with custom or auto-generated codes
- 📋 **URL Management**: View, copy, test, and delete your shortened URLs
- 🎨 **Modern UI**: Clean, responsive design with Tailwind CSS
- 🔄 **Real-time Testing**: Test shortened URLs instantly
- 📊 **Dashboard**: Personal dashboard to manage all your links
- 🛡️ **Security**: Password hashing, CORS protection, and secure cookies

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Redux Toolkit** - State management
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **Lucide React** - Beautiful icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework for Node.js
- **PostgreSQL** - Relational database
- **Drizzle ORM** - Type-safe ORM for SQL databases
- **JWT** - JSON Web Tokens for authentication
- **nanoid** - URL-friendly unique string ID generator
- **Zod** - TypeScript-first schema validation
- **bcrypt** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL (v15 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/url-shortener.git
   cd url-shortener
   ```

2. **Backend Setup**
   ```bash
   cd Backend
   npm install

   # Set up environment variables
   cp .env.example .env
   # Edit .env with your database credentials
   ```

3. **Database Setup**
   ```bash
   # Push database schema
   npm run db:push

   # Optional: Open Drizzle Studio for database visualization
   npm run db:studio
   ```

4. **Frontend Setup**
   ```bash
   cd ../Frontend
   npm install
   ```

### Running the Application

1. **Start Backend Server**
   ```bash
   cd Backend
   npm start
   ```
   Server will run on http://localhost:8000

2. **Start Frontend Development Server**
   ```bash
   cd Frontend
   npm run dev
   ```
   Frontend will run on http://localhost:5173

3. **Access the Application**
   Open http://localhost:5173 in your browser

## 📖 Usage

### Creating Short URLs
1. Navigate to the home page
2. Enter the long URL you want to shorten
3. Optionally, provide a custom code
4. Click "Shorten URL"
5. Copy the generated short URL

### Managing URLs
1. Go to "Your URLs" section
2. View all your shortened links
3. Copy, test, or delete URLs as needed

### Authentication
- **Sign Up**: Create a new account
- **Login**: Access your account
- **Logout**: Securely log out

## 🔌 API Endpoints

### Authentication
- `POST /users/signup` - User registration
- `POST /users/login` - User login
- `POST /users/logout` - User logout
- `GET /users/me` - Get current user info

### URL Management
- `POST /shorten` - Create short URL (authenticated)
- `GET /codes` - Get user's URLs (authenticated)
- `DELETE /:id` - Delete URL (authenticated)
- `GET /:shortCode` - Redirect to original URL (public)

## 🏗️ Project Structure

```
url-shortener/
├── Backend/
│   ├── db/                 # Database connection
│   ├── drizzle/           # Database migrations
│   ├── Middleware/        # Authentication middleware
│   ├── Module/           # Database models
│   ├── Routes/           # API routes
│   ├── services/         # Business logic
│   ├── utils/            # Utilities (hashing, tokens)
│   ├── validations/      # Request validation schemas
│   ├── server.js         # Main server file
│   └── package.json
├── Frontend/
│   ├── public/           # Static assets
│   ├── src/
│   │   ├── Components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── Store/        # Redux store
│   │   ├── App.jsx       # Main app component
│   │   └── main.jsx      # App entry point
│   └── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables (Backend)
Create a `.env` file in the Backend directory:

```env
NODE_ENV=development
PORT=8000
DATABASE_URL=postgresql://username:password@localhost:5432/url_shortener
JWT_SECRET=your-super-secret-jwt-key
```

### Database Schema
The application uses Drizzle ORM with the following main tables:
- **users**: User accounts with authentication data
- **urls**: Shortened URLs linked to users

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Drizzle ORM](https://orm.drizzle.team/) for the amazing database toolkit
- [Tailwind CSS](https://tailwindcss.com/) for the utility-first CSS framework
- [React](https://reactjs.org/) for the powerful frontend library
- [Express.js](https://expressjs.com/) for the robust backend framework

## 📞 Support

If you have any questions or need help, feel free to open an issue on GitHub.

---

**Made with ❤️ by [Your Name]**
