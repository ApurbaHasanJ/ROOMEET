import { Room } from "../room/room.model";
import { Slot } from "../slot/slot.model";
import { TBooking } from "./booking.interface";
import { Booking } from "./booking.model";

// create booking
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

// get all bookings
const getAllBookingsFromDB = async (): Promise<TBooking[]> => {
    const bookings = await Booking.find()
      .populate("slots")
      .populate("room")
      .populate("user")
      .exec();
  
    return bookings;
  };

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB
};
