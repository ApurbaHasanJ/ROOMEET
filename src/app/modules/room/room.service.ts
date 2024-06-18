import httpStatus from "http-status";
import AppError from "../../errors/AppError";
import { IRoom } from "./room.interface";
import Room from "./room.model";

// create a room
const createRoomIntoDB = async (payload: IRoom) => {
  const result = await Room.create(payload);
  return result;
};

// get a room by id
const getRoomByIdFromDB = async (id: string) => {
  const result = await Room.findById(id);
  if (!result || result.isDeleted) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "Room does not exist or has been deleted"
    );
  }
  return result;
};

//   get all rooms
const getAllRoomsFromDB = async () => {
  const result = await Room.find();
  return result;
};

//   update room by id
const updateRoomIntoDB = async (id: string, payload: Partial<IRoom>) => {
  const result = await Room.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteRoomFromDB = async (id: string) => {
  const result = await Room.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const RoomServices = {
  createRoomIntoDB,
  getRoomByIdFromDB,
  getAllRoomsFromDB,
  updateRoomIntoDB,
  deleteRoomFromDB,
};
