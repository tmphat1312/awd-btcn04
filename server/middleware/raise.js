import { z } from "zod";
import { httpCodes } from "../constants/httpCodes.js";
import { reasons } from "../constants/reasons.js";

export function raise(req, res, next) {
  res.raise = (error) => {
    res.status(error.statusCode).json({
      error: error.message,
      reason_phrase: error.reasonPhrase,
      reason_code: error.reasonCode,
    });
  };

  res.badRequest = (error) => {
    if (error instanceof z.ZodError) {
      return res.status(httpCodes.BAD_REQUEST).json({
        errors: error.errors.map((err) => ({
          path: err.path.join("."),
          message: err.message,
        })),
        reason_code: reasons.VALIDATION_ERROR.reasonCode,
      });
    }

    res.status(httpCodes.BAD_REQUEST).json({
      error: error.message,
      reason_code: reasons.VALIDATION_ERROR.reasonCode,
    });
  };

  res.unauthorized = (error) => {
    res.status(httpCodes.UNAUTHORIZED).json({
      error: error.message || "Unauthorized",
      reason_code: reasons.UNAUTHORIZED.reasonCode,
    });
  };

  next();
}
