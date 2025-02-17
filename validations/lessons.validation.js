import Joi from "joi";

function LessonsValidation(data) {
  const lessons = Joi.object({
    name: Joi.string().required(),
    videoLink: Joi.string().required(),
    description: Joi.string().required(),
    CourseID: Joi.number().required().positive(),
  });
  return lessons.validate(data, { abortEarly: true });
}

export default LessonsValidation;
