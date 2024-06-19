import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { BookingServices } from "./booking.service";
import catchAsync from "../../utils/catchAsync";

// create a new booking
const createBooking = catchAsync(async (req: Request, res: Response) => {
  const bookingData = req.body;

  const newBooking = await BookingServices.createBookingIntoDB(bookingData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Booking created successfully",
    data: newBooking,
  });
});

// create a new booking
const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

// create a new booking
const updateBookingInDB = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { isConfirmed } = req.body;
  const result = await BookingServices.updateBookingInDB(id, isConfirmed);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "All bookings retrieved successfully",
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBookings,
  updateBookingInDB,
};
