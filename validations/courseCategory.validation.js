import Joi from "joi";

export function courseCategoryValidation(data) {
    const courseCategorySchema = Joi.object({
        name: Joi.string().min(2).required(),
        image: Joi.string().required(),
    })
    return courseCategorySchema.validate(data)
}
