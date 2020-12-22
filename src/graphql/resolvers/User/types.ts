import { Booking, Listing } from "../../../lib/types";

// Public API
export interface UserArgs {
  id: string;
}

export type UserListingsArgs = UserInputArgs;
export type UserBookingsArgs = UserInputArgs;

export interface UserBookingsData extends UserData {
  result: Booking[];
}

export interface UserListingsData extends UserData {
  result: Listing[];
}

// Private Interfaces
interface UserInputArgs {
  limit: number;
  page: number;
}

interface UserData {
  total: number;
}
