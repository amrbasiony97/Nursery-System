const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const server = express();
const port = process.env.PORT || 8080;

// Run the server
server.listen(port, () => {
  console.log("Server is Running...");
});

// Logging Middleware
server.use(morgan(":url :method"));

// CORS Middleware
server.use(cors());

// Not Found Middleware
server.use((request, response) => {
  response.status(404).json({ data: "NOT FOUND" });
});

// Error handling Middleware
server.use((error, request, response, next) => {
  response.status(500).json({ error: error });
});
