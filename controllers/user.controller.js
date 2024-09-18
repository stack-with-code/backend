const User = require("../model/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Controller function to handle user sign-up
const postUser = async (req, res) => {
  const {
    user_company,
    user_type,
    user_id,
    user_name,
    user_email,
    user_mobile_no,
    password,
    confirm_password,
    terms,
  } = req.body;

  // Basic validation
  if (
    !user_company ||
    !user_type ||
    !user_id ||
    !user_name ||
    !user_email ||
    !user_mobile_no ||
    !password ||
    !confirm_password ||
    !terms
  ) {
    return res.status(400).json({ message: "All fields are required!" });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ message: "Passwords do not match!" });
  }

  try {
    // Check if user already exists
    const existingUser = await User.findOne({ user_email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      user_company,
      user_type,
      user_id,
      user_name,
      user_email,
      user_mobile_no,
      user_password: hashedPassword,
      user_confirm_password: hashedPassword, // Store hashed password for both fields
      user_profile: null,
      user_profile_pic: null,
      user_about: null,
      user_country: null,
      user_state: null,
      user_city: null,
      user_pin_code: null,
      user_Address: null,
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success
    res.status(201).json({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// Controller function to handle getting user by email
const getUserByEmail = async (req, res) => {
  const { email } = req.query;

  // Basic validation
  if (!email) {
    return res.status(400).json({ message: "Email is required!" });
  }

  try {
    // Find user by email
    const user = await User.findOne({ user_email: email });

    if (user) {
      // Respond with user data if found
      res.json({ success: true, user });
    } else {
      // Respond with 404 if user not found
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user by email:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// Controller function to handle user login
const loginUser = async (req, res) => {
  const { user_email, user_password } = req.body;

  // Basic validation
  if (!user_email || !user_password) {
    return res
      .status(400)
      .json({ message: "Email and password are required!" });
  }

  try {
    // Check if user exists
    const user = await User.findOne({ user_email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Compare provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(user_password, user.user_password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials!" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET || "your_jwt_secret",
      {
        expiresIn: "1h",
      }
    );

    // Respond with the token and success status
    res.json({
      success: true,
      token,
      user_type: user.user_type,
      message: "Login successful!",
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error!" });
  }
};

// Controller function to handle updating user profile
const updateUser = async (req, res) => {
  try {
    const {
      user_name,
      user_company,
      user_profile,
      user_country,
      user_Address,
      user_mobile_no,
      user_email,
      user_state,
      user_city,
      user_pin_code,
      user_about,
    } = req.body;

    // Handle file upload
    const user_profile_pic = req.file ? req.file.filename : null;

    // Find and update user
    const updatedUser = await User.findOneAndUpdate(
      { user_email },
      {
        user_name,
        user_company,
        user_profile,
        user_country,
        user_Address,
        user_mobile_no,
        user_profile_pic,
        user_state,
        user_city,
        user_pin_code,
        user_about,
      },
      { new: true }
    );

    res.json({ user: updatedUser });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).send("Server Error");
  }
};

module.exports = { postUser, getUserByEmail, loginUser, updateUser };
