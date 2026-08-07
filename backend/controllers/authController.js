import User from "../models/User.js";
import bcrypt from "bcrypt";
import { generateTokenPair } from "../services/JWTServices.js";

//Register new user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists", type: "error" });
    }

    // Has the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    await User.create({
      name,
      email,
      password: hashedPassword,
    });
    res.json({ message: "User created successfully", type: "success" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

//User Sign In
export const signInUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user already exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    //Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    //Generate JWT token
    
    const payload = { id: user._id.toString(), role: user.isAdmin? 'admin' : 'user' }
    const {accessToken, refreshToken} = generateTokenPair(payload);

    // Store tokens in cookies for 7 days
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: true,  // Set to false if not using HTTPS
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000  // 7 days in milliseconds
    });

    res.json({
      message: "Login Successful",
      accessToken,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error});
  }
};

//Refresh Token
export const refreshTokenCookie = async(req,res)=>{
    try {
        const token = req.cookies.refreshToken;
        if(!token){
            return res.status(401).json({ message: "Not authorized, no token" });
        }
        let decodedToken;
        try{
            decodedToken = verifyRefreshToken(token);
        }catch(error){
            return res.status(401).json({ message: "Refresh token expired" });
        }
        const accessToken = generateAccessToken({ id: decodedToken.id, isAdmin: decodedToken.isAdmin });
        
        res.json({
            message: "Token Refreshed Successfully",
            accessToken,
        });
    } catch (error) {
        res.status(500).json({ message: "Internal server error", error });
    }
} 