import Joi from "joi";

const createTaskValidation = Joi.object({
  nama: Joi.string().min(1).max(255).required(),
  description: Joi.string().max(1000).optional(),
  date: Joi.date().iso().required(),
  status: Joi.string().valid("PENDING", "DOING", "DONE").default("DOING").messages({
    "any.only": "Status harus salah satu dari {#valids}.",
  }),
  kelompok: Joi.string().valid("WORK", "PERSONAL", "SHOPPING", "OTHERS").required(),
});

const updateTaskValidation = Joi.object({
  nama: Joi.string().min(1).max(255).optional(),
  description: Joi.string().max(1000).optional(),
  date: Joi.date().iso().optional(),
  status: Joi.string().valid("PENDING", "DOING", "DONE").optional().messages({
    "any.only": "Status harus salah satu dari {#valids}.",
  }),
  kelompok: Joi.string().valid("WORK", "PERSONAL", "SHOPPING", "OTHERS").optional(),
});

const updateStatusTaskValidation = Joi.object({
  status: Joi.string().valid("PENDING", "DOING", "DONE").required().messages({
    "any.only": "Status harus salah satu dari {#valids}.",
  }),
});

export { createTaskValidation, updateTaskValidation, updateStatusTaskValidation };
