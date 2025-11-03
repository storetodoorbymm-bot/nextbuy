const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const productRoutes = require('./routes/product');
const adminRoutes = require('./routes/admin');
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const wishlistRoutes = require("./routes/wishlist");

const app = express();

// ✅ Allowed origins (add both local + production)
const allowedOrigins = [
  "http://localhost:5173",
  "https://nextbuy-nu.vercel.app"
];

// ✅ CORS must come BEFORE express.json() and routes
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("❌ Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true,
  })
);

// ✅ Middleware to handle JSON body
app.use(express.json());

// ✅ Base route to verify server
app.get("/", (req, res) => {
  res.send("✅ NextBuy Backend is running successfully!");
});

// ✅ API routes
app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/product', productRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wishlist", wishlistRoutes);

const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 5000;

if (!MONGO_URI) {
  console.error("❌ MONGO_URI not found in environment variables!");
  process.exit(1);
}

console.log("⏳ Connecting to MongoDB Atlas...");

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connection successful!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running successfully on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed!", err.message);
    process.exit(1);
  });
