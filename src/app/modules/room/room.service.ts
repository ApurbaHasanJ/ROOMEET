import { IRoom } from "./room.interface";
import Room from "./room.model";

const createRoom = async (payload: IRoom) => {
  const result = await Room.create(payload);
  return result
};

export const RoomServices = {
  createRoom,
};
