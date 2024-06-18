import { Room } from "../room/room.model";
import { Slot } from "../slot/slot.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBookingIntoDB = async (payload: TBooking) => {
  const booking = new Booking(payload);

  // Mark slots as booked
  await Slot.updateMany({ _id: { $in: payload.slots } }, { isBooked: true });

  const result = await booking.save();
  // Populate the result
  await result.populate("slots");
  await result.populate("room");
  await result.populate("user");

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
};
