import Joi from "joi";

export function courseValidation(data) {
    const courseSchema = Joi.object({
        name: Joi.string().min(2).required(),
        description: Joi.string().min(2).required(),
        courseCategoryID: Joi.number().positive().required(),
        image: Joi.string().required(),
        userID: Joi.number().positive().optional(),
    })
    return courseSchema.validate(data)
}