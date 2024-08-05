class DB_CONFIG {
  static PG: object = {
    host: "db",
    port: 5432,
    user: "docker",
    password: "123456",
    database: "socialapp",
  };

  static MONGO: string = "mongodb://mongo:27017";
}

export default DB_CONFIG;
