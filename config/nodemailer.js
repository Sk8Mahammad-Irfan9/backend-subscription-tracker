import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "./env.js";

const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "skirfan0890@gmail.com",
    pass: EMAIL_PASSWORD,
  },
});
