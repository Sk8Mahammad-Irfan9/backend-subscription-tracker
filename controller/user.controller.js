import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.stausCode = 404;
      throw error;
    }
    res.status(200).json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  const session = await mongoose.startSession();

  session.startTransaction();
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }
    const users = await User.findById(req.params.id);

    if (!users) {
      const error = new Error("User not found");
      error.stausCode = 404;
      throw error;
    }

    if (req.body.name) users.name = req.body.name;
    if (req.body.email) users.email = req.body.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
      // users.password = await bcrypt.hash(req.body.password, 10);
    }

    await users.save();
    await session.commitTransaction();
    session.endSession();
    res.status(200).json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const deleteUserById = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id) {
      const error = new Error("You are not the owner of this account");
      error.status = 401;
      throw error;
    }
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      const error = new Error("user not found");
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Successfully user deleted",
    });
  } catch (error) {
    next(error);
  }
};
