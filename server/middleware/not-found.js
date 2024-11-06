import { httpCodes } from "../constants/httpCodes.js";
import { CustomError } from "../lib/customError.js";

export function notFound(req, res, next) {
  return next(new CustomError("Route not found", httpCodes.NOT_FOUND));
}
