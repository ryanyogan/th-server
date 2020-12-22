import { IResolvers } from "apollo-server-express";
import { Request } from "express";
import { Database, User } from "../../../lib/types";
import { authorize } from "../../../lib/utils";
import {
  UserArgs,
  UserBookingsArgs,
  UserBookingsData,
  UserListingsArgs,
  UserListingsData,
} from "./types";

export const userResolvers: IResolvers = {
  Query: {
    user: async (
      _root: undefined,
      { id }: UserArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<User> => {
      try {
        const user = await db.users.findOne({ _id: id });
        if (!user) {
          throw new Error("User could not be found");
        }

        const viewer = await authorize({ db, req });

        if (viewer?._id === user._id) {
          user.authorized = true;
        }

        return user;
      } catch (error) {
        throw new Error(`Failed to query user: ${error}`);
      }
    },
  },
  User: {
    id: (user: User): string => user._id,
    hasWallet: (user: User): boolean => Boolean(user.walletId),
    income: (user: User): number | null => {
      return user.authorized ? user.income : null;
    },
    bookings: async (
      user: User,
      { limit, page }: UserBookingsArgs,
      { db }: { db: Database }
    ): Promise<UserBookingsData | null> => {
      try {
        if (!user.authorized) {
          return null;
        }

        const cursor = db.bookings
          .find({
            _id: { $in: user.bookings },
          })
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit);

        return {
          total: await cursor.count(),
          result: await cursor.toArray(),
        };
      } catch (error) {
        throw new Error(`Failed to query user bookings: ${error}`);
      }
    },
    listings: async (
      user: User,
      { limit, page }: UserListingsArgs,
      { db }: { db: Database }
    ): Promise<UserListingsData | null> => {
      try {
        const cursor = db.listings
          .find({
            _id: { $in: user.listings },
          })
          .skip(page > 0 ? (page - 1) * limit : 0)
          .limit(limit);

        return {
          total: await cursor.count(),
          result: await cursor.toArray(),
        };
      } catch (error) {
        throw new Error(`Failed to query user listings: ${error}`);
      }
    },
  },
};
