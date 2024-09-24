import Joi from "joi";

const createTaskValidation = Joi.object({
  nama: Joi.string().max(20).required().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name cannot be empty",
    "string.max": "Name must not exceed 20 characters",
    "any.required": "Name is required",
  }),
  description: Joi.string().max(100).optional().messages({
    "string.max": "Description must not exceed 100 characters",
  }),
  date: Joi.date().iso().required().messages({
    "date.base": "Date must be a valid date",
    "date.format": "Date must be in ISO format",
    "any.required": "Date is required",
  }),
  kelompok: Joi.string().valid("WORK", "PERSONAL", "SHOPPING", "OTHERS").required().messages({
    "any.only": "Category must be one of {#valids}",
    "any.required": "Category is required",
  }),
});

const updateTaskValidation = Joi.object({
  nama: Joi.string().max(20).optional().messages({
    "string.base": "Name must be a string.",
    "string.max": "Name must not exceed 20 characters",
  }),
  description: Joi.string().max(1000).optional().messages({
    "string.max": "Description must be less than or equal to {#limit} characters long.",
  }),
  date: Joi.date().iso().optional().messages({
    "date.base": "Date must be a valid date",
    "date.format": "Date must be in ISO format",
  }),
  kelompok: Joi.string().valid("WORK", "PERSONAL", "SHOPPING", "OTHERS").optional().messages({
    "any.only": "Category must be one of {#valids}",
  }),
}).allow("");

const updateStatusTaskValidation = Joi.object({
  status: Joi.string().valid("PENDING", "DOING", "DONE").required().messages({
    "any.only": "Status must be one of {#valids}",
    "any.required": "Status is required",
  }),
});

export { createTaskValidation, updateTaskValidation, updateStatusTaskValidation };
