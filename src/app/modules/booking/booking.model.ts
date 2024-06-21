import { Schema, model } from "mongoose";
import { TBooking } from "./booking.interface";

const BookingSchema = new Schema<TBooking>(
  {
    date: { type: String, required: true },
    slots: [{ type: Schema.Types.ObjectId, ref: "Slot", required: true }],
    room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    isConfirmed: { type: String, default: "unconfirmed" },
    isDeleted: { type: Boolean, default: false },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// generating totalAmount
// BookingSchema.virtual("totalAmount").get(function () {
//   const pricePerSlot = this.room.pricePerSlot as Partial<TRoom>;

//   if (!this.room || !pricePerSlot) {
//     return 0;
//   }
//   return pricePerSlot * this.slots.length;
// });

// BookingSchema.methods.calculateTotalAmount = function () {
//   if (!this.room || !this.room.pricePerSlot) {
//     return 0;
//   }
//   return this?.room?.pricePerSlot * this?.slots?.length;
// };

// avoid deleted rooms in return using id
BookingSchema.pre("findOne", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

// avoid deleted rooms in return using find
BookingSchema.pre("find", async function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

export const Booking = model<TBooking>("Booking", BookingSchema);
