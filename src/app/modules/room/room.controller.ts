import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { RoomServices } from "./room.service";
import catchAsync from "../../utils/catchAsync";

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const roomData = req.body;
  const newRoom = await RoomServices.createRoom(roomData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room added successfully",
    data: newRoom,
  });
});

export const RoomControllers = {
  createRoom,
};
