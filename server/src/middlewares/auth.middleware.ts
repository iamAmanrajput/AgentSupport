import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/apiError.js";

export const isAuthenticated = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const token =
      req.cookies?.accessToken ||
      req.body?.accessToken ||
      req.header("Authorization")?.split(" ")[1];

    if (!token) {
      throw new ApiError(
        401,
        "Authentication required. Please login to continue.",
      );
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!);

      req.user = decoded;

      next();
    } catch (error) {
      throw new ApiError(401, "Invalid or expired token. Please login again.");
    }
  },
);
