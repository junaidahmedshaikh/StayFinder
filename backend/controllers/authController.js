import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  const userExist = await User.findOne({ email });
  if (userExist) return res.status(400).json({ message: "User exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    isHost: false,
  });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(201).json({ token, message: "User created successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(200).json({ token, user: {
    name: user.name,
    email: user.email,
    userId: user._id,
    isHost: user.isHost,
  } ,message: "User logged in successfully" });
};

export const becomeHost = async (req, res) => {
  const { userId } = req.body

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { isHost: true },
      { new: true }
    )
    res.json({ success: true, user: updatedUser })
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to update host status" })
  }
}
