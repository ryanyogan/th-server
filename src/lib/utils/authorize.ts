import { Request } from "express";
import { Database, User } from "../types";

interface Props {
  db: Database;
  req: Request;
}

export const authorize = async ({ db, req }: Props): Promise<User | null> => {
  const token = req.get("X-CRSF-TOKEN");
  const viewer = await db.users.findOne({
    _id: req.signedCookies.viewer,
    token,
  });

  return viewer;
};
