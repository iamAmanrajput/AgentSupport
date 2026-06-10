import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError.js";
import { USER_ROLE } from "../constants/roles.js";

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== USER_ROLE.ADMIN) {
    throw new ApiError(403, "Access denied. Admin only.");
  }

  next();
};
