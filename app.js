const express = require('express');
const path = require('path');

// Load the gRPC proto file
// Create Express app
const app = express();
app.use(express.json());

// Middleware to log request details
app.use((req, res, next) => {
  console.log(`Method: ${req.method}`);
  console.log(`Protocol: ${req.protocol}`);
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  next();
});

// Example HTTP route
app.post('/:path', (req, res) => {
  res.json({ message: 'Logged successfully!' });
});

// Start HTTP server
const HTTP_PORT = 3000;
app.listen(HTTP_PORT, () => {
  console.log(`HTTP server running on port ${HTTP_PORT}`);
});
