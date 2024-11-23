// Load environment variables
require('dotenv').config();

const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const postRoutes = require('./routes/posts');

const http = require('http'); // Core module to create the server
const { Server } = require('socket.io'); // Import Socket.io

const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.io with CORS settings
const io = new Server(server, {
  cors: {
    origin: '*', // Allow all origins (change for production)
    methods: ['GET', 'POST'],
  },
});

// Connect to MongoDB
connectDB();

// Attach Socket.io to the app so you can use it in your routes
app.set('io', io);

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api', postRoutes);

// WebSocket logic (Handling real-time chat and notifications)
io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

    // Listen for chat messages and broadcast them with senderId
    socket.on('chatMessage', (data) => {
        // Extract the message and senderId from the received data
        const { message, senderId } = data;
    
        // Log the message in the desired format
        console.log(`Message from ${senderId}: ${message}`);
    
        // Broadcast the message with senderId to all clients
        io.emit('chatMessage', { message, senderId });
      });

  // Listen for new comments and notify all clients
  socket.on('newComment', (comment) => {
    console.log('New comment:', comment);
    io.emit('newComment', comment); // Broadcast new comment notification to all connected clients
  });

  // Handle user disconnections
  socket.on('disconnect', () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

const path = require('path');

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'client')));

// Fallback to serve index.html for any unmatched routes
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'index.html'));
});

// Start the server (use server.listen() because we use http.createServer())
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
