import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RoomValidations } from "./room.validation";
import { RoomControllers } from "./room.controller";
import Room from "./room.model";

const router = express.Router();

router.post(
  "/",
  validateRequest(RoomValidations.createRoomSchema),
  RoomControllers.createRoom
);

router.get("/:id", RoomControllers.getRoomById);
router.get("/", RoomControllers.getAllRooms);

export const RoomRoutes = router;
