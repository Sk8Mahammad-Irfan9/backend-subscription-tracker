import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "User name is required"],
      trim: true,
      minLength: 4,
      maxLength: 50,
    },
    email: {
      type: String,
      require: [true, "Email is required"],
      unique: true,
      trim: true,
      minLength: 5,
      maxLength: 50,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
    },
    password: {
      type: String,
      require: [true, "Password is required"],
      minLength: 6,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
