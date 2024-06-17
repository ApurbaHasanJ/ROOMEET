import { TUser } from "./user.interface";
import { User } from "./user.model";

const createUserIntoDB = async (payload: TUser) => {
  try {
    const result = await User.create(payload);

    return result;
  } catch (err: any) {
    throw new Error(err);
  }
};

export const userServices = {
  createUserIntoDB,
};
