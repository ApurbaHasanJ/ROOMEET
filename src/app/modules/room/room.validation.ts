import { z } from "zod";

const createRoomSchema = z.object({
  body: z.object({
    name: z.string({ message: "Room name is required" }),
    roomNo: z.number({ message: "Room no is required" }).int().positive(),
    floorNo: z.number({ message: "Floor no is required" }).int().positive(),
    capacity: z
      .number({ message: "Room capacity is required" })
      .int()
      .positive(),
    pricePerSlot: z
      .number({ message: "Price per slot is required" })
      .positive(),
    amenities: z
      .array(z.string({ message: "Room amenities is required" }))
      .nonempty(),
  }),
});

export const RoomValidations = {
  createRoomSchema,
};
