const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');



// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/upload', require('./routes/upload'));

// Serve uploaded PDFs statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Root route
app.get('/', (req, res) => {
  res.send('SnapSign backend is running');
});

// TODO: Add auth, docs, signature, and other routes here

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 