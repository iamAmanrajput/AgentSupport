import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError.js";
import { USER_ROLE } from "../constants/roles.js";

export const isOperator = (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== USER_ROLE.OPERATOR) {
    throw new ApiError(403, "Access denied. Operator only.");
  }

  next();
};
