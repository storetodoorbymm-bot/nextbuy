// backend/utils/sendEmail.js
const { Resend } = require("resend");

// Initialize Resend client with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

/**
 * Send email using Resend API
 * @param {string} to - Recipient email address
 * @param {string} subject - Subject of the email
 * @param {string} html - HTML body
 */
async function sendEmail(to, subject, html) {
  try {
    console.log("📨 Sending email to:", to);

    const data = await resend.emails.send({
      from: `"NextBuy" <storetodoorbymm@gmail.com>`, // Your Gmail address
      to,
      subject,
      html,
    });

    console.log("✅ Email sent successfully via Resend:", data);
    return data;
  } catch (err) {
    console.error("❌ Failed to send email:", err);
    throw err;
  }
}

module.exports = sendEmail;

