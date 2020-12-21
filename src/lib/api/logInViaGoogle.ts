import { Google } from ".";
import { Database, User } from "../types";

export const logInViaGoogle = async (
  code: string,
  token: string,
  db: Database
): Promise<User | undefined> => {
  const { user } = await Google.login(code);

  if (!user) {
    throw new Error("Google login error");
  }

  const userName = user?.names?.[0]?.displayName ?? null;
  const userId = user?.names?.[0]?.metadata?.source?.id ?? null;
  const userAvatar = user?.photos?.[0].url ?? null;
  const userEmail = user?.emailAddresses?.[0].value ?? null;

  if (!userId || !userName || !userAvatar || !userEmail) {
    throw new Error("Google login error");
  }

  const updateResponse = await db.users.findOneAndUpdate(
    { _id: userId },
    {
      $set: {
        name: userName,
        avatar: userAvatar,
        contact: userEmail,
        token,
      },
    },
    { returnOriginal: false }
  );

  let viewer = updateResponse.value;

  if (!viewer) {
    const insertResult = await db.users.insertOne({
      _id: userId,
      token,
      name: userName,
      avatar: userAvatar,
      contact: userEmail,
      income: 0,
      bookings: [],
      listings: [],
    });

    viewer = insertResult.ops[0];
  }

  return viewer;
};
