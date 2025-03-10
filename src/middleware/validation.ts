import { NextFunction, Request, Response } from "express";
import z, { ZodError } from "zod";

export const validateRequest = (
  schema: z.ZodObject<any, any>
  // formData?: boolean
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // if (formData) {
      //   schema.parse({ ...req.body, files: req.files });
      // } else {
      schema.parse({ ...req.body });
      // }
      next();
    } catch (error) {
      if (error instanceof ZodError) {
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
