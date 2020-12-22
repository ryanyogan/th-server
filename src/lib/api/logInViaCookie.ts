import { Request, Response } from "express";
import { Database, User } from "../types";
import { cookieOptions } from "./cookieOptions";

interface Props {
  token: string;
  db: Database;
  req: Request;
  res: Response;
}

export const logInViaCookie = async ({
  token,
  db,
  req,
  res,
}: Props): Promise<User | undefined> => {
  const { value: viewer } = await db.users.findOneAndUpdate(
    { _id: req.signedCookies.viewer },
    { $set: { token } },
    { returnOriginal: false }
  );

  if (!viewer) {
    res.clearCookie("viewer", cookieOptions);
  }

  return viewer;
};
