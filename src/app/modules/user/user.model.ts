import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

// Define the schema
const UserSchema = new Schema<TUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  role: { type: String, enum: ["user", "admin"], required: true },
});

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

// Create and export the model
export const User = model<TUser>("User", UserSchema);
