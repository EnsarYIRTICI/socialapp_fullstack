import { MongoClient } from "mongodb";

const connectionString = process.env.MONGO_URL;

console.log("MONGO_URL", "=", connectionString);

export default new MongoClient(process.env.MONGO_URL || "");
