import joi from "joi";

export default async function validateSignIn(request, response, next) {
    const user = request.body;

    const userSchema = joi.object({
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