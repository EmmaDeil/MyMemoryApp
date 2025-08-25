import bcrypt from 'bcryptjs';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';


export const signup = async(req, res) => {
  try {
    console.log("Signup request received:", req.body);
    const { name, email, password, phone} = req.body;
    if(!name || !email || !password || !phone) {
      return res.status(400).json({ message: "All fields are required" });
    }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({ 
    name,
    email,
    password: hashedPassword,
    phone,
    avatar: req.file ? req.file.path : '',
  });
  await newUser.save();
  res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.log("Signup error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};


export const signin = async(req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Password does not match" });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
