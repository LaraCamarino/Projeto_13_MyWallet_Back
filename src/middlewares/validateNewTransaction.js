import joi from "joi";

export default async function validateNewTransaction(request, response, next) {
	const transaction = request.body;

    const transactionSchema = joi.object({
		value: joi.number().required(),
		description: joi.string().required(),
		type: joi.string().valid("entrada").valid("saida")
	});
	const validation = transactionSchema.validate(transaction, { abortEarly: false });
	if (validation.error) {
		response.status(422).send(validation.error.details);
		return;
	}

    next();
}