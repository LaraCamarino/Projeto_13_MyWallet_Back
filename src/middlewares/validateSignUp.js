import joi from "joi";

export default async function validateSignUp(request, response, next) {
    const user = request.body;

    const userSchema = joi.object({
        name: joi.string().required(),
        email: joi.string().email().required(),
        password: joi.string().required()
    });
    const validation = userSchema.validate(user, { abortEarly: false });
    if (validation.error) {
        response.status(422).send(validation.error.details);
        return;
    }

    next();
}