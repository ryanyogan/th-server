import { Booking, Listing } from "../../../lib/types";

export enum ListingsFilter {
  PRICE_LOW_TO_HIGH = "PRICE_LOW_TO_HIGHT",
  PRICE_HIGH_TO_LOW = "PRICE_HIGH_TO_LOW",
}
export interface ListingArgs {
  id: string;
}
export interface ListingsArgs extends PaginatedArgs {
  filter: ListingsFilter;
}
export type ListingsData = Data<Listing>;

export type ListingBookingsArgs = PaginatedArgs;
export type ListingBookingsData = Data<Booking>;
interface PaginatedArgs {
  limit: number;
  page: number;
}
interface Data<T> {
  total: number;
  result: T[];
}
