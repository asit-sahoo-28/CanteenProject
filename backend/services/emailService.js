

import nodemailer from "nodemailer";

export const sendEmail = async ({ to, subject, message }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: process.env.SMTP_SERVICE, // e.g., "gmail"
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD, // Gmail App Password
      },
    });

    const mailOptions = { from: process.env.SMTP_USER, to, subject, html: message };
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.response);
    return info;
  } catch (error) {
    console.error("EMAIL ERROR:", error);
    throw new Error(error.message || "Cannot send email");
  }
};