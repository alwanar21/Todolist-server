import { ResponseError } from "../error/response-error.js";

const validate = (schema, request, res) => {
  const result = schema.validate(request, {
    abortEarly: false,
    allowUnknown: false,
  });

  if (result.error) {
    throw new ResponseError(400, "Bad Request", result.error.details);
  } else {
    return result.value;
  }
};

export { validate };
