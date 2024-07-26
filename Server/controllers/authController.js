import User from "../models/userModel.js";
import { hashPassword, comparePassword } from "../helpers/auth.js";
import jwt from "jsonwebtoken";
import {v2 as cloudinary} from 'cloudinary';

export const registerUser = async (req, res) => {
  try {
    console.log(req.file)
    const { name, email, password, isArtist } = req.body;
    const profilePhoto = req.file;

    const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];

    if (!validImageTypes.includes(profilePhoto.mimetype)) {
      console.error('Invalid image file type:', profilePhoto.mimetype);
      return res.status(400).json({ success: false, error: "Invalid image file type" });
    }

    const imageUpload = await cloudinary.uploader.upload(profilePhoto.path, { resource_type: 'image' });

    const imageUrl = imageUpload.secure_url;

    if (!name) return res.json({ error: "Name is required" });
    const exist = await User.findOne({ email });
    if (exist) return res.json({ error: "Email already taken" });
    if (!password || password.length < 6)
      return res.json({
        error: "Password should be at least 6 characters long",
      });

    const hashedPassword = await hashPassword(password);
    const user = await User.create({ name, email, password: hashedPassword, profilePhoto: imageUrl,isArtist });
    res.json(user);
  } catch (error) {
    console.log(error);
    res.json({ error: "Something went wrong" });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.json({ error: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.json({ error: "User not found!" });

    const match = await comparePassword(password, user.password);
    if (!match) return res.json({ error: "Invalid credentials" });

    jwt.sign(
      { email: user.email, id: user._id, name: user.name, isArtist: user.isArtist },
      process.env.JWT_SECRET,
      {},
      (err, token) => {
        if (err) throw err;
        res.json({
          message: "Login successful",
          user: { name: user.name, email: user.email, id: user._id },
          token,
        });
      }
    );
  } catch (error) {
    res.json({ error: "Something went wrong" });
  }
};

export const getProfilePhoto = async (req, res) => {  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.json({ error: "User not found" });
    res.json({ profilePhoto: user.profilePhoto });
  } catch (error) {
    res.json({ error: "Something went wrong" });
  }
};
