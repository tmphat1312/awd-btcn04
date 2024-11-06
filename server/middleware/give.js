import { httpCodes } from "../constants/httpCodes.js";

export function give(req, res, next) {
  res.give = (data, message) => {
    res.status(httpCodes.OK).json({
      data,
      message,
    });
  };

  res.created = (data, message) => {
    res.status(httpCodes.CREATED).json({
      data,
      message,
    });
  };

  res.noContent = (message) => {
    res.status(httpCodes.NO_CONTENT).json({
      message,
    });
  };

  next();
}
