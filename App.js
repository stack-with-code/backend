const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const router = require("./router/router");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/api", router);

// Serve static files from the uploads directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "my-admin", "build")));
  res.sendFile(path.resolve(__dirname, "my-admin", "build", "index.html"));
});

// Start server
const startServer = async () => {
  try {
    await connectDB(); // Connect to MongoDB
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server:", err);
  }
};

startServer();
