import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

import { db } from "../database/mongo.js"

export async function signUp(request, response) {
	const user = request.body;
	const encryptedPassword = bcrypt.hashSync(user.password, 10);

	try {
		const verifyIfEmailUsed = await db.collection("users").findOne({ email: user.email });
		if (verifyIfEmailUsed) {
			response.status(409).send("Esse e-mail já está em uso.");
			return;
		}

		await db.collection("users").insertOne({ ...user, password: encryptedPassword });
		response.status(201).send("Usuário criado com sucesso.");
	}
	catch (error) {
		response.status(500).send(error);
	}
}

export async function signIn(request, response) {
	const user = request.body;

	try {
		const verifyExistingUser = await db.collection("users").findOne({ email: user.email });
		const verifyPassword = bcrypt.compareSync(user.password, verifyExistingUser.password);

		if (verifyExistingUser && verifyPassword) {
			const token = uuid();
			const userData = {
				name: verifyExistingUser.name,
				userId: verifyExistingUser._id,
				token
			};

			await db.collection("sessions").insertOne(userData);
			response.status(200).send(userData);
			return;
		}
		else {
			response.status(401).send("E-mail ou senha incorretos.");
			return;
		}
	}
	catch (error) {
		response.status(500).send(error);
	}
}