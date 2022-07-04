import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URL);
let db;
mongoClient.connect().then(() => {
	db = mongoClient.db("banco_My_Wallet");
});

const objectId = ObjectId;

export {db, objectId };