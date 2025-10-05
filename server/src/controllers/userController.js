const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
// const nodemailer = require("nodemailer");
const crypto = require("crypto");
const mongoose = require("mongoose");
const sgMail = require('@sendgrid/mail');

dotenv.config();
// const registerUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     console.log(username, email, password);

//     const userWithUsername = await User.findOne({ username: username });

//     if (userWithUsername) {
//       return res
//         .status(400)
//         .json({ message: "User already exists with that username" });
//     }

//     const userWithEmail = await User.findOne({ email: email });

//     if (userWithEmail) {
//       return res
//         .status(400)
//         .json({ message: "User already exists with that email" });
//     }

//     const user = new User({
//       username,
//       email,
//       password,
//     });

//     user.save();

//     res.status(201).json(user);
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: error.message });
//   }
// };

// const registerUser = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;
//     console.log("Received registration data for activation:", { username, email, password });

//     // Check username/email duplicates
//     if (await User.findOne({ username })) {
//       return res
//         .status(400)
//         .json({ message: "User already exists with that username" });
//     }
//     if (await User.findOne({ email })) {
//       return res
//         .status(400)
//         .json({ message: "User already exists with that email" });
//     }

//     // Create token for verification
//     const verificationToken = crypto.randomBytes(32).toString("hex");
//     console.log("Generated verification token for activation:", verificationToken);

//     const user = new User({
//       username,
//       email,
//       password,
//       verificationToken,
//     });

//     await user.save();
//     // Email activation link
//     const activationLink = `${process.env.CLIENT_URL}/verify-user/${verificationToken}`;
//     console.log("Activation link for activation:", activationLink);

//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST,
//       port: process.env.SMTP_PORT,
//       secure: false,
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//       },
//     });

//     // await transporter.sendMail({
//     //   from: `"No Reply" <${process.env.EMAIL_USER}>`,
//     //   to: user.email,
//     //   subject: "Account Activation",
//     //   html: `
//     //     <h2>Welcome ${user.username}</h2>
//     //     <p>Please activate your account by clicking the link below:</p>
//     //     <a href="${activationLink}" style="background:#000;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">Activate Account</a>
//     //   `,
//     // });
//     console.log("Activation email sent to:", user.email);

//     res.status(201).json({
//       message:
//         "Registration successful. Check your email to activate your account.",
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: error.message });
//   }
// };



sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check duplicates
    if (await User.findOne({ username })) {
      return res.status(400).json({ message: "Username already exists" });
    }
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString("hex");

    // Save user with token
    const user = new User({
      username,
      email,
      password,
      verificationToken,
      isVerified: false,
    });

    await user.save();

    // Backend verification link
    const activationLink = `${process.env.CLIENT_URL}/verify-user/${verificationToken}`;

    // Send email
    const msg = {
      to: user.email,
      from: process.env.EMAIL_USER, // verified sender
      subject: "Activate Your QuickCV Account",
      html: `
        <p>Hello <strong>${user.username}</strong>,</p>
        <p>Thank you for registering. Please click the link below to verify your account:</p>
        <p><a href="${activationLink}" style="background:#000;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">Verify Account</a></p>
        <p>If you did not sign up, you can ignore this email.</p>
      `,
    };

    await sgMail.send(msg);

    res.status(201).json({
      message: "Registration successful. Check your email to verify your account.",
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: error.message });
  }
};




const verifyUser = async (req, res) => {
  try {
    const { token } = req.params;
    console.log("Verification token received for activation:", token);

    const user = await User.findOne({ verificationToken: token });
    console.log("User found:", user ? user.username : "No user found for activation");

    if (!user) {
      return res
        .status(400)
        .json({ error: "Invalid or expired activation link" });
    }

    user.isVerified = true;
    user.verificationToken = "";
    await user.save();
    console.log("User verified successfully for activation");

    res.json({ message: "Your account has been activated successfully!" });
  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ error: "Something went wrong during verification" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    const query = usernameOrEmail.includes("@")
      ? { email: usernameOrEmail }
      : { username: usernameOrEmail };

    const user = await User.findOne(query);

    if (!user) {
      return res.status(400).json({ message: "Account not found" });
    }

    console.log("User found:", user.username, "Verified:", user.isVerified);
    if (!user.isVerified) {
      return res
        .status(403)
        .json({ message: "Please verify your email before logging in" });
    }
    console.log("User found and here password:", user.password);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const payload = {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
      },
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      },
      (err, token) => {
        if (err) {
          throw err;
        }
        res.status(200).json({ message: "Successful Login", token: token });
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const fetchUserDetails = async (req, res) => {
  try {
    const reqUser = req.user;
    console.log("Request User:", reqUser); // 🔥 Add this

    const id = reqUser.id;

    console.log("user id from token:", id); // 🔥 Add this

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid user ID format" });
    }

    const user = await User.findById(id);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
      // res.status(200).json(null);
    }

    return res.status(200).json(user);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

// const forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   console.log("email here", email);

//   try {
//     // 1️⃣ Check if user exists
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // 2️⃣ Generate token with encoded user id & expiry (1 hour)
//     const payload = {
//       id: user._id,
//       email: user.email,
//     };
//     const token = jwt.sign(payload, process.env.JWT_SECRET, {
//       expiresIn: "1h",
//     });

//     // 3️⃣ Create reset link
//     const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${token}`;

//     // 4️⃣ Setup Gmail SMTP transporter
//     const transporter = nodemailer.createTransport({
//       host: process.env.SMTP_HOST, // smtp.gmail.com
//       port: process.env.SMTP_PORT, // 587
//       secure: false, // TLS
//       auth: {
//         user: process.env.EMAIL_USER, // your Gmail address
//         pass: process.env.EMAIL_PASS, // 16-char App Password, no spaces
//       },
//     });

//     // 5️⃣ Email content
//     const mailOptions = {
//       from: `"No Reply" <${process.env.EMAIL_USER}>`,
//       to: user.email,
//       subject: "Password Reset Request",
//       html: `
//         <h2>Hello ${user.username || "User"}</h2>
//         <p>You requested a password reset.</p>
//         <p>Click the link below to reset your password. This link will expire in 1 hour.</p>
//         <a href="${resetLink}" style="background:#000;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">Reset Password</a>
//         <p>If you didn't request this, ignore this email.</p>
//       `,
//     };

//     // 6️⃣ Send email
//     const info = await transporter.sendMail(mailOptions);
//     console.log("Email sent:", info.response);

//     res.json({ message: "Reset link sent to your email" });
//   } catch (error) {
//     console.error("Email sending error:", error.message);
//     res.status(500).json({ error: error.message });
//   }
// };

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: "User not found" });

    // Generate token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before saving (safer)
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 60 * 60 * 1000; // 1 hour
    await user.save();

    // Send plain resetToken in email
    const resetLink = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"No Reply" <${process.env.EMAIL_USER}>`,
      to: user.email,
      subject: "Password Reset Request",
      html: `
        <h2>Hello ${user.username || "User"}</h2>
        <p>You requested a password reset.</p>
        <p>Click the link below. It will expire in 1 hour and can only be used once.</p>
        <a href="${resetLink}" style="background:#000;color:#fff;padding:10px 15px;text-decoration:none;border-radius:5px;">Reset Password</a>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error("Email sending error:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    // Hash incoming token
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    // Find user with token + not expired
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user)
      return res.status(400).json({ error: "Invalid or expired token" });

    // Update password
    user.password = password;

    // Clear reset token fields (one-time use)
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// const resetPassword = async (req, res) => {
//   const { password } = req.body;
//   const { token } = req.params;

//   console.log("i got pw and token", password, token);

//   try {
//     // 1️⃣ Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 2️⃣ Find user by ID
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(404).json({ error: "User not found" });

//     // Update user password - let the pre-save middleware handle hashing
//     user.password = password;
//     await user.save();

//     console.log("user password after update", user.password);

//     res.json({ message: "Password updated successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ error: "Invalid or expired token" });
//   }
// };

module.exports = {
  registerUser,
  loginUser,
  fetchUserDetails,
  forgotPassword,
  resetPassword,
  verifyUser,
};
