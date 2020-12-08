// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();

import { connectDatabase } from "../src/database";
import { listings } from "./mockListings";

const seed = async () => {
  try {
    console.log(`[seed] : running...`);

    const db = await connectDatabase();

    for (const listing of listings) {
      await db.listings.insertOne(listing);
    }

    console.log(`[seed] : completed`);
    process.exit(0);
  } catch (_err) {
    throw new Error("failed to seed the collection");
  }
};

seed();
