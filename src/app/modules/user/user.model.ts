import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import config from "../../config";

// Define the schema
const UserSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, select: 0 },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], required: true },
});

// checking if the email address already exists
UserSchema.pre("save", async function (next) {
  const existingUser = await User.findOne({ email: this.email });

  if (existingUser) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      "This email already exists"
    );
  }

  next();
});

// bcrypt the password before saving to the database
UserSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );

  next();
});

// return '' to the client, after saving password
UserSchema.post("save", function (doc, next) {
  doc.password = "";
  next();
});

// Create and export the model
export const User = model<TUser>("User", UserSchema);
