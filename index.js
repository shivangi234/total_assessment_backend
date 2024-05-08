const express = require("express");
const cors = require("cors");
const session = require("express-session");
const router = require("./routes");

// Load environment variables from .env file
require("dotenv").config();

const PORT = process.env.PORT || 5000;
const app = express();

app.use(express.json());

// Fixed encryption key
const ENCRYPTION_KEY = "zyXDMeDPmugtLiNIoJealiiM5k3TzKMl";

// Configure CORS middleware
const allowedOrigins = process.env.NODE_ENV === 'development' ? ['http://localhost:3000'] : ['https://totalassessment.netlify.app'];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Configure session middleware
app.use(
    session({
      secret: ENCRYPTION_KEY, // Use the fixed encryption key
      resave: false,
      saveUninitialized: true,
      cookie: { secure: false },
    })
);

// Routes
app.use("/api/v1", router);

app.use("/", (req, res) => {
  res.send({ status: 200, message: "Welcome to TOTAL Assessment Backend." });
});

app.listen(PORT, () => console.log("Server is listening on port " + PORT));
