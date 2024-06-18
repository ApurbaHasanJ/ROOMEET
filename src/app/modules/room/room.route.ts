import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { RoomValidations } from "./room.validation";
import { RoomControllers } from "./room.controller";
import Room from "./room.model";

const router = express.Router();

// post new room
router.post(
  "/",
  validateRequest(RoomValidations.createRoomSchema),
  RoomControllers.createRoom
);

router.get("/:id", RoomControllers.getRoomById); //get single room

router.get("/", RoomControllers.getAllRooms); // get all rooms

// update room by id
router.put(
  "/:id",
  validateRequest(RoomValidations.updateRoomSchema),
  RoomControllers.updateRoom
);

router.delete("/:id", RoomControllers.deleteRoom) // delete room by id

export const RoomRoutes = router;
