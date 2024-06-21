import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { Room } from '../room/room.model';
import { Types } from 'mongoose';

export const calculateTotalAmount = async (
  roomId: Types.ObjectId | undefined,
  slotLength: number | undefined,
): Promise<number> => {
  const room = await Room.findById(roomId);

  if (!room) {
    throw new AppError(httpStatus.NOT_FOUND, 'Room not found');
  }

  if (slotLength === undefined) {
    throw new AppError(httpStatus.NOT_FOUND, 'Slot not found');
  }

  return room.pricePerSlot * slotLength;
};
