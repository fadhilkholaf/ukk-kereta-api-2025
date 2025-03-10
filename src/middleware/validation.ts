import { NextFunction, Request, Response } from "express";
import z from "zod";

export const validate = (schema: z.ZodObject<any, any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({ ...req.body });
      next();
    } catch (error) {
      console.log(error);

      if (error instanceof z.ZodError) {
        res.status(400).json({
          messages: "Bad request!",
          data: error.issues.map((e) => ({
            paths: e.path.join(", "),
            message: e.message,
          })),
        });
      } else {
        res.status(500).json({ messages: "Something went wrong!", data: null });
      }
    }
  };
};
