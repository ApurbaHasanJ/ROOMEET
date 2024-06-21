import { Types } from 'mongoose';

export enum BookingStatus {
  Unconfirmed = 'unconfirmed',
  Confirmed = 'confirmed',
  Canceled = 'canceled',
}

export interface TBooking {
  date: string;
  slots: Types.ObjectId[];
  room: Types.ObjectId;
  user: Types.ObjectId;
  isConfirmed: BookingStatus;
  isDeleted: boolean;
}
