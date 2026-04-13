
export const generateForgetPasswordEmailTemplate = (token) => {
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${token}`;
  return `
    <h2>ERP System Password Reset</h2>
    <p>Click the button below to reset your password:</p>
    <a href="${resetUrl}" style="padding:10px; background:#4f46e5; color:#fff; text-decoration:none;">
      Reset Password
    </a>
    <p>If the button doesn’t work, copy and paste this link into your browser:</p>
    <p>${resetUrl}</p>
    <p>This link will expire in 15 minutes.</p>
  `;
};

