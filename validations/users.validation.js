import Joi from 'joi';

function userValidation(data) {
    const Users = Joi.object({
        name: Joi.string().required().max(25).min(2),
        surname: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        role: Joi.string().required(),
        experience: Joi.number().required(),
        year: Joi.date().required(),
        avatar: Joi.string().required(),
        status: Joi.string().optional(),
    });
    return Users.validate(data, {abortEarly: true});
}

export default userValidation;