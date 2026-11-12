const fs = require('fs');
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB Atlas using the MONGODB_URI from .env
async function connectToDatabase() {
  if (!process.env.MONGODB_URI) {
    console.warn('MONGODB_URI is missing. Create a .env file in backend/ before testing database features.');
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: 'blog' });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error(`MongoDB connection error: ${error.message}`);
  }
}

// Parse JSON request bodies
app.use(express.json());

// REST API routes
app.use('/api/posts', postsRouter);

// Unknown API routes always answer with JSON
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// In production (Render), serve the built React app from frontend/dist.
// Any other GET route returns index.html so React Router can handle it.
const distDir = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.get('*', (req, res) => {
    res.sendFile(path.join(distDir, 'index.html'));
  });
}

// 404 handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// 500 error handler
app.use((error, req, res, next) => {
  console.error(error.stack);
  res.status(500).json({ error: 'Server error' });
});

// Start the server after the database connection attempt
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log('Mounted routers:');
    console.log('  /api/posts -> routes/posts.js');
    if (fs.existsSync(distDir)) console.log('  /* -> React build (frontend/dist)');
  });
});
