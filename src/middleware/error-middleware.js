import { ResponseError } from "../error/response-error.js";

const errorMiddleware = async (err, req, res, next) => {
  if (!err) {
    next();
    return;
  }

  if (err instanceof ResponseError) {
    res
      .status(err.status)
      .json({
        message: err.message,
        ...(err.errorDetails ? { errors: err.errorDetails } : {}),
      })
      .end();
  } else {
    res
      .status(500)
      .json({
        message: "Internal Server Error",
        errors: err.message,
      })
      .end();
  }
};

export { errorMiddleware };
