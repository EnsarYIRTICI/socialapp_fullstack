class DB_CONFIG {
  static PG: object = {
    host: "localhost",
    port: 5432,
    user: "postgres",
    password: "123456",
    database: "socialapp",
  };

  static MONGO: string = "mongodb://localhost:27017";
}

export default DB_CONFIG;
