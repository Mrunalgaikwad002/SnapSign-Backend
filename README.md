# SnapSign Backend

A Node.js/Express backend for SnapSign, supporting user authentication, PDF upload, and MongoDB integration.

## Features
- User registration and login with JWT authentication
- Secure PDF upload (only PDF files allowed)
- MongoDB database integration
- RESTful API endpoints

## Requirements
- Node.js (v18 or higher recommended)
- MongoDB database (local or Atlas)

## Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Mrunalgaikwad002/SnapSign-Backend.git
cd SnapSign-Backend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Set up environment variables
Create a `.env` file in the root directory with the following variables:

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=10000 # or any port you prefer
```

- **MONGO_URI**: Your MongoDB connection string (required)
- **JWT_SECRET**: A secret key for signing JWT tokens (required)
- **PORT**: (Optional) Port for the server (defaults to 5000 if not set)

> **Note:** Do NOT commit your `.env` file to version control. Add `.env` to your `.gitignore`.

### 4. Start the server
```bash
npm start
```

The server will run on `http://localhost:10000` (or the port you set).

## API Endpoints

### Auth
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Login and receive a JWT
- `GET /api/auth/me` — Get current user info (requires JWT)
- `GET /api/auth/verify` — Verify JWT token (requires JWT)

### Upload
- `POST /api/upload` — Upload a PDF file (requires JWT, field name: `pdf`)

### Static Files
- `GET /uploads/:filename` — Access uploaded PDF files

## Deployment Notes
- Set environment variables (`MONGO_URI`, `JWT_SECRET`, and optionally `PORT`) in your deployment platform's dashboard (e.g., Render, Vercel, Heroku).
- Do NOT upload your `.env` file to GitHub.
- If using Render, add these variables in the Environment tab and redeploy.

## Project Structure
```
backend/
  config/        # Database connection
  middleware/    # Auth middleware
  models/        # Mongoose models
  routes/        # API routes (auth, upload)
  uploads/       # Uploaded PDF files
  server.js      # Main server file
  package.json   # Project metadata
```

## License
ISC 
