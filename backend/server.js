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
app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

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

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("✅ MongoDB connection successful!");
    app.listen(PORT, () => {
      console.log(`🚀 Server running successfully on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed!");
    console.error("🔍 Error details:", err.message);
    process.exit(1);
  });


