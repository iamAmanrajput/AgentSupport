import { jwtPayload } from "../types/jwt.types.js";
export {};

declare global {
  namespace Express {
    interface Request {
      user?: jwtPayload;
    }
  }
}
