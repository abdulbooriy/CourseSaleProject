import Joi from "joi";

function CommentsValidation(data) {
  const comments = Joi.object({
    description: Joi.string().required(),
    star: Joi.number().required().positive(),
    createdAt: Joi.date().required(),
    CourseID: Joi.number().required().positive(),
    UsersID: Joi.number().required().positive(),
  });
  return comments.validate(data, { abortEarly: true });
}

export default CommentsValidation;
