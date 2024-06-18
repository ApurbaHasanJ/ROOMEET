import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RoomValidations } from "./room.validation";
import { RoomControllers } from "./room.controller";

const router = express.Router();

router.post(
  "/",
  validateRequest(RoomValidations.createRoomSchema),
  RoomControllers.createRoom
);

export const RoomRoutes = router;
