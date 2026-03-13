const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

async function sendVerificationEmail(to, token) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Verify your email',
    html: `<p>Click <a href="${process.env.FRONTEND_URL}/verify?token=${token}">here</a> to verify your account.</p>`
  };
  await transporter.sendMail(mailOptions);
}

async function sendPasswordResetEmail(to, token) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: 'Reset your password',
    html: `<p>Click <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">here</a> to reset your password.</p>`
  };
  await transporter.sendMail(mailOptions);
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };