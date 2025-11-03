const SibApiV3Sdk = require("@sendinblue/client");

const brevo = new SibApiV3Sdk.TransactionalEmailsApi();
brevo.setApiKey(SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey, process.env.BREVO_API_KEY);

async function sendEmail(to, subject, html) {
  const email = {
    sender: { name: "NextBuy", email: process.env.EMAIL_USER },
    to: [{ email: to }],
    subject,
    htmlContent: html,
  };

  try {
    const response = await brevo.sendTransacEmail(email);
    console.log("✅ Email sent via Brevo:", response.messageId || response);
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
  }
}

module.exports = sendEmail;
