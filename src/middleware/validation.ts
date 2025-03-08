import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

export const validateRequest = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ ...req.body, files: req.files });
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          messages: "Bad request!",
          data: error.issues.map((e) => ({
            paths: e.path.join(", "),
            message: e.message,
          })),
          debug: req.files,
        });
      } else {
        res
          .status(500)
          .json({ messages: "Something went wrong!", data: req.files });
      }
    }
    return;
  };
};
