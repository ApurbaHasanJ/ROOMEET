import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { BookingControllers } from "./booking.controller";
import { BookingValidations } from "./booking.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(BookingValidations.createBookingSchema),
  BookingControllers.createBooking
);

router.get("/", BookingControllers.getAllBookings);

export const BookingRoutes = router;
