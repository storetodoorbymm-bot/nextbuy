const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/userController");
const sendEmail = require("../utils/sendEmail");
const verifyOtp = require("../utils/verify-otp");
const { otpMap } = require("../utils/Otpstore");
const User = require('../models/User'); 

router.post("/login", login);

router.post("/signup", signup);

router.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ message: "Email is required" });

  try {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpMap.set(email, otp);
    const html = `
      <div style="font-family:Arial, sans-serif; color:#333; background:#f9f9f9; padding:20px;">
        <div style="max-width:500px; margin:auto; background:#fff; border-radius:8px; padding:20px; border:1px solid #eee;">
          <h2 style="text-align:center; color:#4f46e5;">NextBuy</h2>
          <p style="font-size:16px;">Hello,</p>
          <p style="font-size:16px;">Your One-Time Password (OTP) for verification is:</p>
          <div style="text-align:center; margin:20px 0;">
            <span style="font-size:24px; font-weight:bold; color:#4f46e5;">${otp}</span>
          </div>
          <p style="font-size:14px; color:#666;">This OTP is valid for 10 minutes. Please do not share it with anyone.</p>
          <hr style="border:none; border-top:1px solid #eee;">
          <p style="font-size:12px; text-align:center; color:#aaa;">© ${new Date().getFullYear()} NextBuy. All rights reserved.</p>
        </div>
      </div>
    `;

    await sendEmail(email, "Your One-Time Password (OTP) - NextBuy", html);

    res.status(200).json({ message: "OTP sent successfully" });
  } catch (err) {
    console.error("Error sending OTP:", err.message);
    res.status(500).json({ message: "Failed to send OTP", error: err.message });
  }
});

router.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ message: "Email and OTP are required" });
  }

  const isValid = verifyOtp(email, otp);
  if (isValid) {
    return res.status(200).json({ verified: true });
  }

  return res.status(400).json({ verified: false, message: "Invalid or expired OTP" });
});

module.exports = router;
