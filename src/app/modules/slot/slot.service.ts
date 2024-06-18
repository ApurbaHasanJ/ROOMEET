import { TSlot } from "./slot.interface";
import { Slot } from "./slot.model";

const createSlotIntoDB = async (payload: TSlot) => {
  const result = await Slot.create(payload);
  return result;
};

const getAvailableSlotsFromDB = async (date?: string, roomId?: string) => {
    const query: any = { isBooked: false };
    
    if (date) {
      query.date = date;
    }
    
    if (roomId) {
      query.room = roomId;
    }
    
    const result = await Slot.find(query).populate("room");
    return result;
  };

  
export const SlotServices = {
  createSlotIntoDB,
  getAvailableSlotsFromDB
};
