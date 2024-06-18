import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { BookingServices } from "./booking.service";
import catchAsync from "../../utils/catchAsync";

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

export const BookingControllers = {
  createBooking,
};
