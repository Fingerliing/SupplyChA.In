require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);

// MongoDB connection
const mongoURI = process.env.MONGO_URI;

if (!mongoURI) {
    console.error('MongoDB URI is not defined in .env file');
    process.exit(1);
  }
  
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB Atlas');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Sample route
app.get('/', (req, res) => {
  res.send('Sales Forecasting API');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
