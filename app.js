const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");
const teacherRouter = require("./Routers/teacherRouter");
const childRouter = require("./Routers/childRouter");
const classRouter = require("./Routers/classRouter");
const server = express();
const port = process.env.PORT || 8080;

// Connect to MongoDB
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/NURSERY_SYSTEM")
  .then(() => {
    console.log("Database is connected");
    // Run the server
    server.listen(port, () => {
      console.log("Server is Running...");
    });
  })
  .catch((error) => {
    console.log(`error: ${error}`);
  });

// Logging Middleware
server.use(morgan(":url :method"));

// CORS Middleware
server.use(cors());

// parse-data
server.use(express.json());
server.use(express.urlencoded({ extended: false }));

// Routes
server.use(teacherRouter);
server.use(childRouter);
server.use(classRouter);

// Not Found Middleware
server.use((request, response) => {
  response.status(404).json({ data: "NOT FOUND" });
});

// Error handling Middleware
server.use((error, request, response, next) => {
  let status = error.status || 500;
  response.status(status).json({ message: error + "" });
});
