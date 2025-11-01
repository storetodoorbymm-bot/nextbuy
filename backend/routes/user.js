const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const User = require("../models/User");
const { getUserByEmail } = require("../controllers/userController");

router.get("/me", async (req, res) => {
  const { email } = req.query;
  try {
    const user = await User.findOne({ email }).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

router.put("/profile", authMiddleware, async (req, res) => {
  const { name, address, contact } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.userId,
      { name, address, contact },
      { new: true }
    ).select("-password");

    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Update failed", error: err.message });
  }
});

router.post("/cart", authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { productId } = req.body;

    if (!productId) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const alreadyInCart = user.cart.some(
      (item) => item.toString() === productId
    );

    if (!alreadyInCart) {
      user.cart.push(productId);
      await user.save();
    }

    res.status(200).json({ message: "Product added to cart" });
  } catch (err) {
    res.status(500).json({ message: "Add to cart failed", error: err.message });
  }
});

router.put("/change-password", authMiddleware, async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  try {
    if (!oldPassword || !newPassword) {
      return res.status(400).json({ message: "Old and new passwords are required" });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await require("bcryptjs").compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Old password is incorrect" });
    }

    const bcrypt = require("bcryptjs");
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedNewPassword;
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error("Password update failed:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
