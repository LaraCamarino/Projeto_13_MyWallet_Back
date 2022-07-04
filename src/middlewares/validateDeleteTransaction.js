import {db} from "../database/mongo.js"

export default async function validateDeleteTransaction(request, response, next) {
    const { authorization } = request.headers;



    next();
}