import { Request, Response } from "express";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { RoomServices } from "./room.service";
import catchAsync from "../../utils/catchAsync";

const createRoom = catchAsync(async (req: Request, res: Response) => {
  const roomData = req.body;
  const newRoom = await RoomServices.createRoomIntoDB(roomData);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room added successfully",
    data: newRoom,
  });
});

// get room by id
const getRoomById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await RoomServices.getRoomByIdFromDB(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Room retrieved successfully",
    data: result,
  });
});
// get all rooms
const getAllRooms = catchAsync(async (req: Request, res: Response) => {
  
  const result = await RoomServices.getAllRoomsFromDB();

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Rooms retrieved successfully",
    data: result,
  });
});

export const RoomControllers = {
  createRoom,
  getRoomById,
  getAllRooms
};
