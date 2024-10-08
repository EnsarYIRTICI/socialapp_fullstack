import pg from "pg";

const connectionString = process.env.PG_URL;

console.log("PG_URL", "=", connectionString);

export default new pg.Pool({
  connectionString: connectionString,
});
