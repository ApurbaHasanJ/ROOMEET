import express from "express";
import { userControllers } from "./user.controller";
import { userValidations } from "./user.validation";
import validateRequest from "../../middlewares/validateRequest";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(userValidations.createUserSchema),
  userControllers.createUser
);

export const UserRoutes = router;
