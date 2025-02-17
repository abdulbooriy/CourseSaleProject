import Joi from "joi";

export function userValidation(data) {
  const Users = Joi.object({
    firstName: Joi.string().required().max(25).min(2),
    lastName: Joi.string().required().max(25).min(2),
    email: Joi.string().required(),
    password: Joi.string().required(),
    role: Joi.string().optional(),
    experience: Joi.number().required(),
    year: Joi.date().required(),
    avatar: Joi.string().required(),
    status: Joi.string().optional(),
  });
  return Users.validate(data, { abortEarly: true });
}

export function userUpdateValidation(data) {
  const Users = Joi.object({
    firstName: Joi.string().optional().max(25).min(2),
    lastName: Joi.string().optional().max(25).min(2),
    email: Joi.string().optional(),
    password: Joi.string().optional(),
    role: Joi.string().optional(),
    experience: Joi.number().optional(),
    year: Joi.date().optional(),
    avatar: Joi.string().optional(),
    status: Joi.string().optional(),
  });
  return Users.validate(data, {abortEarly: true});
}