
import User from "../models/userModel.js";
import { sendEmail } from "../services/emailService.js";

// ------------------ CUSTOM ERROR HANDLER CLASS ------------------
class ErrorHandler extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
  }
}

// ------------------ REGISTER ------------------
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return next(new ErrorHandler("Please provide all required fields", 400));
    }

    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return next(new ErrorHandler("User already exists", 400));
    }

    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    // ------------------ SEND WELCOME EMAIL ------------------
    const welcomeMessage = `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8"/>
<title>Welcome</title>
</head>
<body style="margin:0;padding:0;background:#f4f6f8;">
<table width="100%" style="padding:30px 0;">
<tr>
<td align="center">
<table width="600" style="background:#fff;border-radius:10px;overflow:hidden;
box-shadow:0 6px 16px rgba(0,0,0,0.1);font-family:Arial;">
<tr>
<td style="background:#2f855a;padding:25px;text-align:center;color:#fff;">
<h1 style="margin:0;">Canteen Application 🍽️</h1>
<p style="margin:6px 0 0;font-size:14px;">Smart & Easy Food Ordering System</p>
</td>
</tr>

<tr>
<td style="padding:35px;color:#333;">
<h2>Hello <span style="color:#2f855a;">${name}</span> 👋</h2>

<p>Welcome to the <b>Canteen Application</b>!</p>

<div style="text-align:center;margin:35px 0;">
<a href="https://your-app-url.com/login"
style="background:#2f855a;color:#fff;padding:14px 36px;text-decoration:none;
border-radius:8px;font-weight:bold;">
Login to Canteen Application
</a>
</div>

<p>Enjoy your meals 🍴</p>
<b>Canteen Application Team</b>

</td>
</tr>

<tr>
<td style="background:#f1f1f1;padding:18px;text-align:center;font-size:12px;color:#777;">
This is an automated message sent to <b>${email}</b>.<br/>
© ${new Date().getFullYear()} Canteen Application
</td>
</tr>

</table>
</td>
</tr>
</table>
</body>
</html>
`;

    sendEmail({
      to: user.email,
      subject: "Welcome to Canteen App 🎉",
      message: welcomeMessage,
    }).catch((err) =>
      console.error("Welcome email failed:", err.message)
    );

    const token = user.generateToken();

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------ LOGIN ------------------
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please provide all required fields", 400));
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
    }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }

    const token = user.generateToken();

    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------ LOGOUT ------------------
export const logout = async (req, res, next) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
      .json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

// ------------------ GET USER ------------------
export const getUser = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------ FORGET PASSWORD OTP ------------------
export const forgetPasswordOTP = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email: email.toLowerCase(),
    });

    if (!user) {
      return next(new ErrorHandler("User not found", 404));
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    user.resetOTP = otp;
    user.resetOTPExpire = Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    await sendEmail({
      to: user.email,
      subject: "Canteen App Password Reset OTP",
      message: `
        <p>Your OTP is <b>${otp}</b></p>
        <p>This OTP will expire in <b>15 minutes</b>.</p>
      `,
    });

    res.status(200).json({
      success: true,
      message: `OTP sent to ${user.email}`,
    });
  } catch (error) {
    next(error);
  }
};

// ------------------ RESET PASSWORD USING OTP ------------------
export const resetPasswordWithOTP = async (req, res, next) => {
  try {
    const { email, otp, password, confirmPassword } = req.body;

    if (!email || !otp || !password || !confirmPassword) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    const user = await User.findOne({
      email: email.toLowerCase(),
      resetOTP: Number(otp),
      resetOTPExpire: { $gt: Date.now() },
    }).select("+password");

    if (!user) {
      return next(new ErrorHandler("Invalid or expired OTP", 400));
    }

    if (password !== confirmPassword) {
      return next(
        new ErrorHandler("Password and confirm password do not match", 400)
      );
    }

    user.password = password;
    user.resetOTP = undefined;
    user.resetOTPExpire = undefined;

    await user.save();

    const token = user.generateToken();

    res.status(200).json({
      success: true,
      message: "Password reset successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};
