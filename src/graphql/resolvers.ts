import { IResolvers } from "apollo-server-express";
import { listings } from "../listings";

export const resolvers: IResolvers = {
  Query: {
    listings: () => listings,
  },
  Mutation: {
    deleteListing: (_root: undefined, { id }: { id: string }) => {
      listings.forEach((listing, idx) => {
        if (listing.id === id) {
          return listings.splice(idx, 1)[0];
        }
      });

      throw new Error("failed to delete listing");
    },
  },
};
