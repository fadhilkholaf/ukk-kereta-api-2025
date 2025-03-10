import { NextFunction, Request, Response } from "express";
import { JsonWebTokenError, verify } from "jsonwebtoken";

import { findUserQuery } from "@/database/query/user";
import { AuthAccess, AuthToken } from "@/types/auth";

export const auth =
  (access: AuthAccess) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { token } = req.cookies;

      if (!token) {
        res.status(401).json({
          message: "Unauthorized!",
          data: null,
        });
        return;
      }

      const verifiedToken = verify(
        token,
        process.env.SECRET_KEY || "yanggelapkaubukanindonesia"
      ) as unknown as AuthToken;

      const existingUser = await findUserQuery({ id: verifiedToken.id });

      if (!existingUser) {
        res.status(401).json({
          message: "Unauthorized!",
          data: null,
        });
        return;
      }

      if (access === "private") {
        next();
        return;
      }

      if (existingUser.role !== access) {
        res.status(401).json({
          message: "Unauthorized!",
          data: null,
        });
        return;
      }

      next();
    } catch (error) {
      console.log(error);

      if (error instanceof JsonWebTokenError) {
        res.status(401).json({
          message: "Unauthorized!",
          data: null,
        });
      } else {
        res.status(500).json({
          message: "Something went wrong!",
          data: null,
        });
      }
    }
  };
