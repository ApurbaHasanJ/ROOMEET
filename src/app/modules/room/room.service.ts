import { IRoom } from "./room.interface";
import Room from "./room.model";

const createRoomIntoDB = async (payload: IRoom) => {
  const result = await Room.create(payload);
  return result
};

const getRoomByIdFromDB = async (id: string) => {
    const result = await Room.findById(id);
    return result
  };

const getAllRoomsFromDB = async () => {
    const result = await Room.find();
    return result
  };

export const RoomServices = {
    createRoomIntoDB,
    getRoomByIdFromDB,
    getAllRoomsFromDB
};
