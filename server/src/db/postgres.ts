import pg from "pg";
import DB_CONFIG from "../config/db.js";

export default new pg.Pool(DB_CONFIG.PG);
