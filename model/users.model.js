const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    user_company: {
      type: String,
      required: true,
    },
    user_type: {
      type: String,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
      unique: true,
    },
    user_name: {
      type: String,
      required: true,
    },
    user_email: {
      type: String,
      required: true,
      unique: true,
    },
    user_mobile_no: {
      type: String,
      required: true,
      unique: true,
    },
    user_password: {
      type: String,
      required: true,
    },
    user_confirm_password: {
      type: String,
      required: true,
    },
    user_profile: {
      type: String,
      default: null,
    },
    user_profile_pic: {
      type: String,
      default: null,
    },
    user_about: {
      type: String,
      default: null,
    },
    user_country: {
      type: String,
      default: null,
    },
    user_state: {
      type: String,
      default: null,
    },
    user_city: {
      type: String,
      default: null,
    },
    user_pin_code: {
      type: String,
      default: null,
    },
    user_Address: {
      type: String,
      default: null,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

// Create and export the User model

module.exports = mongoose.model("User", userSchema);
