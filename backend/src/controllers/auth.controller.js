import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model.js";

import mongoose from "mongoose";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const checkDbConnection = (res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.status(503).json({ 
      message: "Database connection is not established. This is likely an IP whitelist issue in MongoDB Atlas.",
      error: "DB_CONNECTION_ERROR"
    });
  }
  return null;
};

export const signup = async (req, res) => {
  const dbError = checkDbConnection(res);
  if (dbError) return dbError;

  try {
    const { name, email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ name, email: normalizedEmail, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1d" }
    );

    res.status(201).json({ token, user: { id: newUser._id, name: newUser.name, email: newUser.email } });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

export const login = async (req, res) => {
  const dbError = checkDbConnection(res);
  if (dbError) return dbError;

  try {
    const { email, password } = req.body;
    const normalizedEmail = email.toLowerCase();

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Something went wrong", error: err.message });
  }
};

export const googleAuth = async (req, res) => {
  const dbError = checkDbConnection(res);
  if (dbError) return dbError;

  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    const payload = ticket.getPayload();
    const { sub, email, name, picture } = payload;
    const normalizedEmail = email.toLowerCase();

    let user = await User.findOne({ email: normalizedEmail });

    if (!user) {
      // Create a password-less user for Google login
      // Or we can generate a random password
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 12);
      user = new User({
        name,
        email: normalizedEmail,
        password: hashedPassword, // User can reset later or it's just a placeholder
        googleId: sub,
        picture
      });
      await user.save();
    } else {
      // If user exists but doesn't have googleId, we can link it
      if (!user.googleId) {
        user.googleId = sub;
        if (!user.picture) user.picture = picture;
        await user.save();
      }
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET || "supersecretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({ token, user: { id: user._id, name: user.name, email: user.email, picture: user.picture } });
  } catch (err) {
    console.error("Google Auth error details:", {
      message: err.message,
      stack: err.stack,
      audience: process.env.GOOGLE_CLIENT_ID
    });
    res.status(500).json({ message: "Google authentication failed", error: err.message });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password").sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch users", error: err.message });
  }
};
