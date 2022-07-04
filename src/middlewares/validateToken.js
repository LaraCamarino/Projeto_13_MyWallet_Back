import {db} from "../database/mongo.js"

export default async function validateToken(request, response, next) {
    const { authorization } = request.headers;
    const token = authorization?.replace("Bearer ", "");

    const verifyValidToken = await db.collection("sessions").findOne({ token });
    if (!verifyValidToken) {
        response.status(401).send("Token inválido.");
        return;
    }

    response.locals.verifyValidToken = verifyValidToken;

    next();
}