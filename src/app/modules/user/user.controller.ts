import { RequestHandler } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { userServices } from "./user.service";

// create a new user
const createUser: RequestHandler = catchAsync(async (req, res) => {
  const result = await userServices.createUserIntoDB(req.body);

  // Send response
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User created successfully",
    data: result,
  });
});

export const userControllers = {
  createUser,
};
