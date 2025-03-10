import { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError } from "jsonwebtoken";

import { AuthRole, AuthToken } from "@/types/auth";

export const auth =
  (access: AuthRole) =>
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

      const verifiedToken = jwt.verify(
        token,
        process.env.SECRET_KEY || "yanggelapkaubukanindonesia"
      ) as unknown as AuthToken;

      if (verifiedToken && access === "private") {
        next();
        return;
      }

      if (verifiedToken.role !== access) {
        res.status(401).json({
          message: "Unauthorized!",
          data: null,
        });
        return;
      }

      next();
    } catch (error) {
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
