import { Schema, model, Document } from "mongoose";
import { IRoom } from "./room.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";

const RoomSchema = new Schema<IRoom>(
  {
    name: { type: String, required: true },
    roomNo: { type: Number, required: true, unique: true },
    floorNo: { type: Number, required: true },
    capacity: { type: Number, required: true },
    pricePerSlot: { type: Number, required: true },
    amenities: { type: [String], required: true },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

// checking if the room no is already exists
RoomSchema.pre("save", async function (next) {
  const existingRoom = await Room.findOne({ roomNo: this.roomNo });

  if (existingRoom) {
    throw new AppError(
      httpStatus.ALREADY_REPORTED,
      "This room no. is already exists"
    );
  }

  next();
});

const Room = model<IRoom>("Room", RoomSchema);
export default Room;
