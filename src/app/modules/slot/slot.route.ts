import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { SlotValidations } from "./slot.validation";
import { SlotControllers } from "./slot.controller";

const router = express.Router();

// create slot
router.post(
  "/",
  validateRequest(SlotValidations.createSlotSchema),
  SlotControllers.createSlot
);

router.get("/availability", SlotControllers.getAvailableSlots);


export const SlotRoutes = router;
