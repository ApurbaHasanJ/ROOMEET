import httpStatus from "http-status";
import AppError from "../../errors/AppError";
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
const getAllBookingsFromDB = async () => {
  const result = await Booking.find()
    .populate("slots")
    .populate("room")
    .populate("user")
    .exec();

  return result;
};

//   update booking by admin
const updateBookingInDB = async (id: string, isConfirmed: boolean) => {
  const updatedBooking = await Booking.findByIdAndUpdate(
    id,
    { isConfirmed },
    { new: true }
  ).exec();

  if (!updatedBooking) {
    throw new AppError(httpStatus.NOT_FOUND, "Booking not found");
  }

  const room = await Room.findById(updatedBooking.room);
  const totalAmount = room
    ? room.pricePerSlot * updatedBooking.slots.length
    : 0;

  return { ...updatedBooking.toObject(), totalAmount };
};

// delete booking by id
const deleteBookingFromDB = async (id: string) => {
  const result = await Booking.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );

  const room = await Room.findById(result?.room);
  const totalAmount = room ? room?.pricePerSlot * result?.slots?.length : 0;

  return { ...result?.toObject(), totalAmount };
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  updateBookingInDB,
  deleteBookingFromDB,
};
