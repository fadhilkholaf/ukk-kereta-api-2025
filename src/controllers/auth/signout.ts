import { Request, Response } from "express";

export const signOutController = async (_: Request, res: Response) => {
  try {
    res
      .status(200)
      .clearCookie("token")
      .json({ message: "Sign out success!", data: null });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Something went wrong!",
      data: null,
    });
  }
};
