import { MongoClient } from "mongodb";
import DB_CONFIG from "../config/db.js";

export default new MongoClient(DB_CONFIG.MONGO);
