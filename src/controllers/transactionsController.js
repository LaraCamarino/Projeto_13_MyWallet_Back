import dayjs from "dayjs";

import { db, objectId } from "../database/mongo.js"

export async function createNewTransaction(request, response) {
	const transaction = request.body;
	const verifyValidToken = response.locals.verifyValidToken;

	try {
		await db.collection("transactions").insertOne({
			userId: verifyValidToken.userId,
			value: transaction.value,
			description: transaction.description,
			type: transaction.type,
			day: dayjs().format("DD/MM")
		});
		response.status(201).send("Transação criada com sucesso.");
	}
	catch (error) {
		response.status(500).send(error);
	}
}

export async function getTransactions(request, response) {
	const verifyValidToken = response.locals.verifyValidToken;

	try {
		const userTransactions = await db.collection("transactions").find({ userId: verifyValidToken.userId }).toArray();
		response.status(200).send(userTransactions);
	}
	catch (error) {
		response.status(500).send(error);
	}
}

export async function deleteTransaction(request, response) {
	const id = request.params.id;

	try {
		const verifyExistingTransaction = await db.collection("transactions").findOne({ _id: new objectId(id) });
		if (!verifyExistingTransaction) {
			response.status(404).send("O registro não existe.");
			return;
		}
		
		await db.collection("transactions").deleteOne({ _id: new objectId(id) });
		response.status(200).send("Registro apagado com sucesso.");
	}
	catch (error) {
		response.status(500).send(error);
	}
}


